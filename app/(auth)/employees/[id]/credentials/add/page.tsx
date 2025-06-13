"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Plus, Trash2, X } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import authStore from "@/store/authStore";
import useCredentials from "@/hooks/use-Credentials";
import useTags from "@/hooks/use-Tags";

import { CREDENTIALS_PAGE } from "@/constants/redirect";
import { CredentialFormValues } from "@/types/credentials";
import { IconInput } from "@/components/ui/icon-Input";
import { Tag } from "@/types/tag";

export default function AddCredentialsPage() {
    const { register, handleSubmit } = useForm<CredentialFormValues>();
    const [websites, setWebsites] = useState([""]);
    const [additional, setAdditional] = useState<{ label: string; value: string }[]>([
        { label: "", value: "" },
    ]);
    const [tagsInfo, setTagsInfo] = useState<Tag[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [showTagDropdown, setShowTagDropdown] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const tagInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { addCredentials } = useCredentials();
    const { getTags, addTag } = useTags();
    const user = authStore((s) => s.user);
    const router = useRouter();

    const handleAddUrl = () => setWebsites([...websites, ""]);
    const handleRemoveUrl = (index: number) => setWebsites(websites.filter((_, i) => i !== index));

    const handleAddCustom = () => setAdditional([...additional, { label: "", value: "" }]);
    const handleRemoveCustom = (index: number) => setAdditional(additional.filter((_, i) => i !== index));

    const handleAddTag = (tag: string) => {
        if (!selectedTags.includes(tag)) setSelectedTags([...selectedTags, tag]);
        setTagInput("");
    };

    const handleRemoveTag = (tag: string) => setSelectedTags(selectedTags.filter((t) => t !== tag));

    const handleCreateTagLocally = () => {
        const trimmed = tagInput.trim();
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed]);
            setSelectedTags([...selectedTags, trimmed]);
            setTagInput("");
        }
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const trimmed = tagInput.trim();
            const match = tags.find((t) => t.toLowerCase() === trimmed.toLowerCase());
            if (match) {
                handleAddTag(match);
            } else {
                handleCreateTagLocally();
            }
        } else if (e.key === "Backspace" && !tagInput) {
            handleRemoveTag(selectedTags[selectedTags.length - 1]);
        }
    };

    const filteredTags = useMemo(
        () =>
            tags
                .filter((tag) => tag.toLowerCase().includes(tagInput.toLowerCase()) && !selectedTags.includes(tag))
                .sort((a, b) => a.localeCompare(b)),
        [tags, tagInput, selectedTags]
    );

    const onSubmit = async (form: CredentialFormValues) => {
        // 1. Determine which selectedTags don't exist yet in tagsInfo
        const existingTagNamesLower = tagsInfo.map((t) => t.name.toLowerCase());
        const newTagNames = selectedTags.filter(
            (tagName) => !existingTagNamesLower.includes(tagName.toLowerCase())
        );

        // 2. Create any new tags on the server
        for (const name of newTagNames) {
            try {
                await addTag({ name });
            } catch (err) {
                console.error(`Error creating tag "${name}":`, err);
            }
        }

        // 3. Re-fetch the full tags list to get updated IDs
        let refreshedTagsInfo: Tag[] = [];
        try {
            const tagRes = await getTags({ limit: 10000 });
            if (tagRes) {
                refreshedTagsInfo = tagRes.data;
                setTagsInfo(refreshedTagsInfo);
                setTags(refreshedTagsInfo.map((t) => t.name));
            }
        } catch (err) {
            console.error("Failed to fetch tags after creation:", err);
            refreshedTagsInfo = tagsInfo;
        }

        // 4. Build array of tag IDs from refreshedTagsInfo
        const tags_ids: number[] = selectedTags
            .map((tagName) => {
                const matched = refreshedTagsInfo.find(
                    (t) => t.name.toLowerCase() === tagName.toLowerCase()
                );
                return matched ? matched.id : undefined;
            })
            .filter((id): id is number => id !== undefined);

        // 5. Construct a FormData object and append all fields.
        //    Use array syntax in keys so that even single values are parsed as arrays.
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("notes", form.notes || "");
        formData.append("two_factor_secret", "");

        // Append each website under "website[]"
        const validWebsites = websites.filter((url) => url.trim());
        if (validWebsites.length === 0) {
            // If none provided, still send an empty array placeholder
            // formData.append("website[]", "");
        } else {
            validWebsites.forEach((url, index) => formData.append(`website[${index}]`, url));
        }

        // Append additional fields under "additional[]"
        const validAdditional = additional.filter((f) => f.label.trim());
        if (validAdditional.length === 0) {
            // formData.append("additional[]", JSON.stringify({ label: "", value: "" }));
        } else {
            validAdditional.forEach((field, index) => {
                formData.append(`additional[${index}][label]`, field.label);
                formData.append(`additional[${index}][value]`, field.value);
            }
            );
        }

        // Append each tag ID under "tags_ids[]"
        if (tags_ids.length === 0) {
            // formData.append("tags_ids[]", "0");
        } else {
            tags_ids.forEach((id, index) => formData.append(`tag_ids[${index}]`, id.toString()));
        }

        // // Append each file under "files[]"
        // if (selectedFiles.length === 0) {
        //     // Send a placeholder empty file array entry
        //     // formData.append("files[]", new File([], ""));
        // } else {
        //     selectedFiles.forEach((file, index) => {
        //         formData.append(`files[${index}]`, file);
        //     });
        // }

        // 6. Log FormData entries for debugging
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        // 7. Call addCredentials with the correctly typed FormData
        await addCredentials(formData as unknown as CredentialFormValues, user?.user?.id as number);

        // 8. Optionally navigate away on success
        // router.replace(CREDENTIALS_PAGE);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (tagInputRef.current && !tagInputRef.current.contains(e.target as Node)) {
                setShowTagDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        (async () => {
            const tagRes = await getTags({ limit: 10000 });
            if (tagRes) {
                setTags(tagRes.data.map((tag) => tag.name));
                setTagsInfo(tagRes.data);
            }
        })();
    }, [getTags]);

    return (
        <Card className="mx-auto bg-white dark:bg-gray-800 shadow-none rounded-none">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Add Credential</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Core Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <IconInput id="name" label="Name *" placeholder="e.g., My Bank" {...register("name")} />
                        <IconInput
                            id="username"
                            label="Username *"
                            placeholder="e.g., user@example.com"
                            {...register("username")}
                        />
                        <IconInput id="password" label="Password *" type="password" {...register("password")} />
                    </div>

                    {/* URLs */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label>URLs</Label>
                            <Button type="button" size="sm" onClick={handleAddUrl} variant="outline">
                                <Plus className="h-4 w-4 mr-1" /> Add URL
                            </Button>
                        </div>
                        {websites.map((url, i) => (
                            <div key={i} className="flex gap-2">
                                <Input
                                    type="url"
                                    value={url}
                                    onChange={(e) => {
                                        const updated = [...websites];
                                        updated[i] = e.target.value;
                                        setWebsites(updated);
                                    }}
                                    placeholder="https://example.com"
                                    className="flex-1"
                                />
                                {websites.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleRemoveUrl(i)}
                                        className="border-red-500 text-red-500"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Notes */}
                    <div>
                        <Label>Notes</Label>
                        <Textarea placeholder="Any additional information" rows={3} {...register("notes")} />
                    </div>

                    {/* Custom Fields */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label>Custom Fields</Label>
                            <Button type="button" size="sm" onClick={handleAddCustom} variant="outline">
                                <Plus className="h-4 w-4 mr-1" /> Add Field
                            </Button>
                        </div>
                        {additional.map((field, i) => (
                            <div key={i} className="flex gap-2">
                                <Input
                                    placeholder="Label"
                                    value={field.label}
                                    onChange={(e) => {
                                        const updated = [...additional];
                                        updated[i].label = e.target.value;
                                        setAdditional(updated);
                                    }}
                                    className="flex-1"
                                />
                                <Input
                                    placeholder="Value"
                                    value={field.value}
                                    onChange={(e) => {
                                        const updated = [...additional];
                                        updated[i].value = e.target.value;
                                        setAdditional(updated);
                                    }}
                                    className="flex-1"
                                />
                                {additional.length > 1 && (
                                    <Button
                                        type="button"
                                        size="icon"
                                        onClick={() => handleRemoveCustom(i)}
                                        className="border-red-500 text-red-500"
                                        variant="outline"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-2">
                            {selectedTags.map((tag) => (
                                <div
                                    key={tag}
                                    className="flex items-center bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 px-3 py-1 rounded-full text-sm"
                                >
                                    {tag}
                                    <button onClick={() => handleRemoveTag(tag)} className="ml-2 hover:bg-indigo-200 p-0.5 rounded-full">
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="relative" ref={tagInputRef}>
                            <Input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onFocus={() => setShowTagDropdown(true)}
                                onKeyDown={handleTagKeyDown}
                                placeholder="Type or create a tag"
                            />
                            {showTagDropdown && (
                                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto">
                                    {filteredTags.map((tag) => (
                                        <div
                                            key={tag}
                                            onClick={() => handleAddTag(tag)}
                                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                    {tagInput.trim() && !tags.includes(tagInput.trim()) && (
                                        <div
                                            onClick={handleCreateTagLocally}
                                            className="px-4 py-2 text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center"
                                        >
                                            <Plus className="w-4 h-4 mr-2" /> Create &quot;{tagInput.trim()}&quot;
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* File Upload */}
                    <div>
                        <Label htmlFor="file">Credentials File</Label>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-indigo-600 text-white hover:bg-indigo-700"
                            >
                                Choose Files
                            </Button>
                            <span className="text-sm text-gray-500">
                                {selectedFiles.length > 0 ? `${selectedFiles.length} files selected` : "No files chosen"}
                            </span>
                        </div>
                        <Input
                            id="file"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files as FileList)]);
                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                }
                            }}
                            ref={fileInputRef}
                        />
                        {selectedFiles.length > 0 && (
                            <div className="mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-700">
                                <Label>Selected Files</Label>
                                <div className="space-y-2 mt-1">
                                    {selectedFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center bg-white dark:bg-gray-600 p-2 rounded shadow-sm"
                                        >
                                            <span className="text-sm truncate max-w-xs">{file.name}</span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
                                                }
                                                className="text-red-500 border-red-500 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <p className="text-sm text-gray-500 mt-1">Optional file attachment</p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" type="button" onClick={() => router.replace(CREDENTIALS_PAGE)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
                            Save
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card >
    );
}