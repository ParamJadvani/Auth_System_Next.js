"use client";
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, X } from 'lucide-react';
import useCredentials from '@/hooks/use-Credentials';
import authStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { CREDENTIALS_PAGE } from '@/constants/redirect';
import { CredentialFormValues } from '@/types/credentials';

export default function AddCredentialsPage() {
    const { register, handleSubmit, setValue } = useForm<CredentialFormValues>();
    const [urls, setUrls] = useState(['']);
    const [customFields, setCustomFields] = useState([{ label: '', value: '' }]);
    const [availableTags, setAvailableTags] = useState([
        'Work', 'Personal', 'Financial', 'Social', 'Shopping'
    ]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [showTagDropdown, setShowTagDropdown] = useState(false);
    const tagInputRef = useRef<HTMLInputElement>(null);
    const { addCredentials } = useCredentials();
    const userStore = authStore(s => s.user);
    const router = useRouter();

    // URL handlers
    const addUrl = () => setUrls([...urls, '']);
    const removeUrl = (index: number) => {
        if (urls.length > 1) {
            setUrls(urls.filter((_, i) => i !== index));
        }
    };

    // Custom field handlers
    const addCustomField = () => setCustomFields([...customFields, { label: '', value: '' }]);
    const removeCustomField = (index: number) => {
        if (customFields.length > 1) {
            setCustomFields(customFields.filter((_, i) => i !== index));
        }
    };

    // Tag handlers
    const addTag = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            const newTags = [...selectedTags, tag];
            setSelectedTags(newTags);
            setValue('tags', newTags); // Update form value
        }
        setTagInput('');
    };

    const createNewTag = () => {
        const newTag = tagInput.trim();
        if (newTag && !availableTags.includes(newTag)) {
            const newAvailableTags = [...availableTags, newTag];
            const newSelectedTags = [...selectedTags, newTag];

            setAvailableTags(newAvailableTags);
            setSelectedTags(newSelectedTags);
            setValue('tags', newSelectedTags); // Update form value
            setTagInput('');
        }
    };

    const removeTag = (tag: string) => {
        const newTags = selectedTags.filter(t => t !== tag);
        setSelectedTags(newTags);
        setValue('tags', newTags); // Update form value
    };

    // Filter tags for dropdown
    const filteredTags = availableTags.filter(tag =>
        tag.toLowerCase().includes(tagInput.toLowerCase()) &&
        !selectedTags.includes(tag)
    );

    // Check if tag exists
    const tagExists = (tag: string) =>
        availableTags.some(t => t.toLowerCase() === tag.trim().toLowerCase());

    // Handle keyboard events
    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tagInput.trim()) {
                if (tagExists(tagInput)) {
                    const exactMatch = availableTags.find(t =>
                        t.toLowerCase() === tagInput.trim().toLowerCase()
                    );
                    if (exactMatch) addTag(exactMatch);
                } else {
                    createNewTag();
                }
            }
        } else if (e.key === 'Backspace' && !tagInput && selectedTags.length > 0) {
            removeTag(selectedTags[selectedTags.length - 1]);
        }
    };

    // Handle clicks outside tag dropdown
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (tagInputRef.current && !tagInputRef.current.contains(e.target as Node)) {
                setShowTagDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Form submission
    const onSubmit = async (data: CredentialFormValues) => {
        const formData = {
            ...data,
            website: urls.filter(url => url.trim() !== ''),
            customFields: customFields.filter(field => field.label.trim() !== ''),
        };

        console.log('Form Data:', formData);
        await addCredentials(formData, userStore?.user?.id as number)

    };

    return (
        <Card className="mx-auto bg-white dark:bg-gray-800 shadow-none rounded-none overflow-hidden">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Add New Credential</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Name *
                            </Label>
                            <Input
                                id="name"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                                placeholder="e.g., My Bank Account"
                                {...register('name')}
                            />
                        </div>

                        <div>
                            <Label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Username *
                            </Label>
                            <Input
                                id="username"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                                placeholder="e.g., user@example.com"
                                {...register('username')}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password *
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                                placeholder="Enter strong password"
                                {...register('password')}
                            />
                        </div>
                    </div>

                    {/* Dynamic URLs */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">URLs</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addUrl}
                                className="gap-1 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-gray-700"
                            >
                                <Plus className="h-4 w-4" /> Add URL
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {urls.map((url, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input
                                        value={url}
                                        onChange={(e) => {
                                            const newUrls = [...urls];
                                            newUrls[index] = e.target.value;
                                            setUrls(newUrls);
                                        }}
                                        placeholder="https://example.com"
                                        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                                        type="url"
                                    />
                                    {urls.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => removeUrl(index)}
                                            className="shrink-0 border-red-500 text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Notes
                        </Label>
                        <Textarea
                            id="notes"
                            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                            placeholder="Add any additional information about this credential"
                            rows={3}
                            {...register('notes')}
                        />
                    </div>

                    {/* Custom Fields */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Custom Fields</Label>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addCustomField}
                                className="gap-1 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-gray-700"
                            >
                                <Plus className="h-4 w-4" /> Add Field
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {customFields.map((field, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Input
                                        value={field.label}
                                        onChange={(e) => {
                                            const newFields = [...customFields];
                                            newFields[index].label = e.target.value;
                                            setCustomFields(newFields);
                                        }}
                                        placeholder="Field name (e.g., Security Question)"
                                        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                                    />
                                    <Input
                                        value={field.value}
                                        onChange={(e) => {
                                            const newFields = [...customFields];
                                            newFields[index].value = e.target.value;
                                            setCustomFields(newFields);
                                        }}
                                        placeholder="Field value"
                                        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                                    />
                                    {customFields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => removeCustomField(index)}
                                            className="shrink-0 border-red-500 text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-4">
                        <input type="hidden" {...register('tags')} />

                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</Label>

                        {/* Selected tags */}
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedTags.map(tag => (
                                <div
                                    key={tag}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-2 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-700 p-0.5"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Tag input with dropdown */}
                        <div className="relative" ref={tagInputRef}>
                            <Input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onFocus={() => setShowTagDropdown(true)}
                                placeholder="Type to search or create tags"
                                onKeyDown={handleTagInputKeyDown}
                                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                            />

                            {showTagDropdown && (
                                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {filteredTags.length > 0 && filteredTags.map(tag => (
                                        <div
                                            key={tag}
                                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                            onClick={() => addTag(tag)}
                                        >
                                            <span className="text-gray-800 dark:text-gray-200">{tag}</span>
                                        </div>
                                    ))}

                                    {tagInput.trim() && !tagExists(tagInput) && (
                                        <div
                                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center text-indigo-600 dark:text-indigo-400"
                                            onClick={createNewTag}
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create &quot;{tagInput.trim()}&quot;
                                        </div>
                                    )}

                                    {filteredTags.length === 0 && !tagInput.trim() && (
                                        <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm">
                                            No tags available. Type to create a new tag.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-2">
                        <Label htmlFor="file" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Credentials File
                        </Label>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <Input
                                id="file"
                                type="file"
                                className="w-auto border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 bg-gray-50 dark:bg-gray-700"
                                {...register('file')}
                            />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Upload any related documents (optional)
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 flex justify-end">
                        <Button type="button" variant="outline" onClick={() => router.replace(CREDENTIALS_PAGE)} className="mr-2">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200"
                        >
                            Save Credential
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}