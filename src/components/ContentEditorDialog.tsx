import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/services/api";


interface FileEntry {
    filename: string;
    languageKey?: string;
}

interface ContentEditorDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    files: FileEntry[];
    onSaveSuccess: () => void;
}


export default function ContentEditorDialog({ open, onOpenChange, files, onSaveSuccess }: ContentEditorDialogProps) {
    const { token } = useAuth()
    const [contents, setContents] = useState<Record<string, string>>({})
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (!open) {
            setContents({})
            setErrors({})
            return
        }
        files.forEach(async ({ filename, languageKey }) => {
            const url = languageKey
                ? `/pilot/content/${filename}?key=${languageKey}`
                : `/pilot/content/${filename}`
            const data = await apiFetch<Record<string, unknown>>(url, undefined, token ?? undefined)
            setContents(prev => ({ ...prev, [filename]: JSON.stringify(data, null, 2) }))
        })
    }, [open, files, token])

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {}
        files.forEach(({ filename }) => {
            try {
                JSON.parse(contents[filename] ?? '')
            } catch {
                newErrors[filename] = 'Invalid JSON'
            }
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSave = async () => {
        if (!validate()) return 
        setSaving(true)
        try {
            await Promise.all(files.map(({ filename, languageKey }) => 
                apiFetch(`/pilot/content/${filename}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        ...(languageKey && { key : languageKey }),
                        content: JSON.parse(contents[filename])
                    })
                }, token ?? undefined)
            ))
            onSaveSuccess()
            onOpenChange(false)
        } catch (e) {
            console.error(e)
            toast.error('Failed to save content')
        } finally {
            setSaving(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle>Edit Content</DialogTitle>
                </DialogHeader>

                <div className='flex flex-col gap-6'>
                    {files.map(({ filename }) => (
                        <div key={filename} className='flex flex-col gap-2'>
                            <label className='text-sm font-medium'>{filename}</label>
                            <textarea
                                className={`w-full h-64 p-3 text-sm font-mono rounded-md border resize-y ${errors[filename] ? 'border-red-500' : 'border-gray-300'}`}
                                value={contents[filename] ?? ''}
                                onChange={e => {
                                    setContents(prev => ({ ...prev, [filename]: e.target.value }))
                                    setErrors(prev => ({ ...prev, [filename]: '' }))
                                }}
                            />
                            {errors[filename] && (
                                <span className='text-sm text-red-500'>{errors[filename]}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className='flex justify-end gap-2 pt-4'>
                    <Button variant='outline' onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
