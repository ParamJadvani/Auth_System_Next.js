"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
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
import { PasswordInput } from "@/components/ui/password-Input";
import { authenticator } from "otplib";
import { toast } from "react-toastify";

export default function AddCredentialsPage() {
    const { register, handleSubmit, reset, getValues, watch } = useForm<CredentialFormValues>();
    const [edit, setEdit] = useState(false);
    const [websites, setWebsites] = useState([""]);
    const [additional, setAdditional] = useState<{ label: string; value: string }[]>([{ label: "", value: "" }]);
    const [tagsInfo, setTagsInfo] = useState<Tag[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [showTagDropdown, setShowTagDropdown] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isClient, setIsClient] = useState(false); // Track client-side rendering
    const tagInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // TOTP setup
    const secret = watch("two_factor_secret") || "KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD";
    authenticator.options = { step: 30, digits: 6 };
    const [otp, setOtp] = useState(""); // Initialize empty to avoid SSR mismatch
    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null); // Initialize null to avoid SSR mismatch

    // Set isClient to true after mounting on the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Handle OTP and timer updates on the client
    useEffect(() => {
        if (isClient) {
            const updateTimer = () => {
                const currentTime = Math.floor(Date.now() / 1000);
                const secondsSinceEpoch = currentTime % 30;
                const remaining = 30 - secondsSinceEpoch;
                setRemainingSeconds(remaining);
                if (secondsSinceEpoch === 0) {
                    setOtp(authenticator.generate(secret));
                } else if (!otp) {
                    setOtp(authenticator.generate(secret)); // Set initial OTP
                }
            };

            updateTimer(); // Set initial values
            const interval = setInterval(updateTimer, 1000);

            return () => clearInterval(interval);
        }
    }, [isClient, secret]);

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    const { getCredentialsDetails, updateCredentials } = useCredentials();
    const { getTags, addTag } = useTags();
    const user = authStore((s) => s.user);
    const router = useRouter();
    const { id } = useParams();

    // Tag & URL & custom-field logic
    const handleAddUrl = () => setWebsites([...websites, ""]);
    const handleRemoveUrl = (i: number) =>
        setWebsites(websites.filter((_, idx) => idx !== i));
    const handleAddCustom = () =>
        setAdditional([...additional, { label: "", value: "" }]);
    const handleRemoveCustom = (i: number) =>
        setAdditional(additional.filter((_, idx) => idx !== i));
    const handleAddTag = (tag: string) => {
        if (!selectedTags.includes(tag)) setSelectedTags([...selectedTags, tag]);
        setTagInput("");
    };
    const handleRemoveTag = (tag: string) =>
        setSelectedTags(selectedTags.filter((t) => t !== tag));
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
                .filter(
                    (t) =>
                        t.toLowerCase().includes(tagInput.toLowerCase()) &&
                        !selectedTags.includes(t)
                )
                .sort((a, b) => a.localeCompare(b)),
        [tags, tagInput, selectedTags]
    );

    // Fetch tags on mount
    useEffect(() => {
        (async () => {
            const res = await getTags({ limit: 10000 });
            if (res) {
                setTags(res.data.map((t) => t.name));
                setTagsInfo(res.data);
            }
        })();
    }, [getTags]);

    // Load existing credential when editing
    useEffect(() => {
        if (!id) return;
        (async () => {
            const detail = await getCredentialsDetails(Number(id));
            if (detail) {
                reset({
                    name: detail.name,
                    username: detail.username,
                    password: detail.pass,
                    notes: detail.note || "",
                    website: detail.website || [],
                    additional: detail.additional || [],
                    two_factor_secret: detail.two_factor_secret || detail.pass,
                    tag_ids: detail.tags?.map((t) => t.id) || [],
                    files: [],
                    id: detail.id,
                });
                setWebsites(detail.website.length ? detail.website : [""]);
                setAdditional(
                    detail.additional.length
                        ? detail.additional
                        : [{ label: "", value: "" }]
                );
                setSelectedTags(detail.tags?.map((t) => t.name) || []);
            }
        })();
    }, [id, getCredentialsDetails, reset]);

    // Close tag dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                tagInputRef.current &&
                !tagInputRef.current.contains(e.target as Node)
            ) {
                setShowTagDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const onSubmit = async (form: CredentialFormValues) => {
        const existingTagNamesLower = tagsInfo.map((t) => t.name.toLowerCase());
        const newTagNames = selectedTags.filter(
            (tagName) => !existingTagNamesLower.includes(tagName.toLowerCase())
        );

        for (const name of newTagNames) {
            try {
                await addTag({ name });
            } catch (err) {
                console.error(`Error creating tag "${name}":`, err);
            }
        }

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

        const tags_ids: number[] = selectedTags
            .map((tagName) => {
                const matched = refreshedTagsInfo.find(
                    (t) => t.name.toLowerCase() === tagName.toLowerCase()
                );
                return matched ? matched.id : undefined;
            })
            .filter((id): id is number => id !== undefined);

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("notes", form.notes || "");
        formData.append("two_factor_secret", "");

        const validWebsites = websites.filter((url) => url.trim());
        validWebsites.forEach((url, idx) =>
            formData.append(`website[${idx}]`, url)
        );

        const validAdditional = additional.filter((f) => f.label.trim());
        validAdditional.forEach((field, idx) => {
            formData.append(`additional[${idx}][label]`, field.label);
            formData.append(`additional[${idx}][value]`, field.value);
        });

        tags_ids.forEach((id, idx) =>
            formData.append(`tag_ids[${idx}]`, id.toString())
        );

        await updateCredentials(
            formData as unknown as CredentialFormValues,
            form.id as number,
            user?.user?.id as number
        );
    };

    const OtpTimer = ({ remainingSeconds }: { remainingSeconds: number }) => {
        const radius = 15;
        const circumference = 2 * Math.PI * radius;
        const progress = remainingSeconds / 30;
        const strokeDashoffset = circumference - progress * circumference;

        return (
            <svg width="40" height="40" viewBox="0 0 40 40">
                <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    stroke="lightgray"
                    strokeWidth="2"
                    fill="none"
                />
                <circle
                    cx="20"
                    cy="20"
                    r={radius}
                    stroke="blue"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 20 20)"
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="10"
                    fill="gray"
                >
                    {remainingSeconds}s
                </text>
            </svg>
        );
    };

    return (
        <Card className="mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center justify-between">
                    {id ? "Edit Credentials" : "Add Credentials"}
                    <Button
                        onClick={() => setEdit(!edit)}
                        variant={edit ? "default" : "outline"}
                        size="icon"
                    >
                        {edit ? "🔓" : "✏️"}
                    </Button>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Core Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <IconInput
                            id="name"
                            label="Name *"
                            placeholder="e.g., My Bank"
                            {...register("name")}
                            readOnly={!edit}
                            className={!edit ? "cursor-pointer opacity-70" : ""}
                            onClick={() => !edit && copyToClipboard(getValues("name") || "")}
                        />
                        <IconInput
                            id="username"
                            label="Username *"
                            placeholder="e.g., user@example.com"
                            {...register("username")}
                            readOnly={!edit}
                            className={!edit ? "cursor-pointer opacity-70" : ""}
                            onClick={() => !edit && copyToClipboard(getValues("username") || "")}
                        />
                        <PasswordInput
                            id="password"
                            label="Password *"
                            {...register("password")}
                            readOnly={!edit}
                            className={!edit ? "cursor-pointer opacity-70" : ""}
                            onClick={() => !edit && copyToClipboard(getValues("password") || "")}
                        />

                        {/* OTP + Circular Countdown */}
                        {!edit && isClient && remainingSeconds !== null ? (
                            <div className="relative">
                                <IconInput
                                    id="otp"
                                    label="OTP"
                                    value={otp}
                                    readOnly
                                    className="cursor-pointer opacity-70 pr-12"
                                    onClick={() => copyToClipboard(otp)}
                                />
                                <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                                    <OtpTimer remainingSeconds={remainingSeconds} />
                                </div>
                            </div>
                        ) : !edit ? (
                            <div className="flex items-center gap-2">
                                <div className="w-full h-10 bg-gray-200 animate-pulse rounded" />
                                <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
                            </div>
                        ) : (
                            <PasswordInput
                                id="two_factor_secret"
                                label="Two-Factor Secret"
                                {...register("two_factor_secret")}
                                readOnly={!edit}
                            />
                        )}
                    </div>

                    {/* URLs */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label>URLs</Label>
                            <Button
                                type="button"
                                size="sm"
                                onClick={handleAddUrl}
                                variant="outline"
                                disabled={!edit}
                            >
                                <Plus className="h-4 w-4 mr-1" /> Add URL
                            </Button>
                        </div>
                        {websites.map((url, i) => (
                            <div key={i} className="flex gap-2">
                                <Input
                                    type="url"
                                    value={url}
                                    placeholder="https://example.com"
                                    readOnly={!edit}
                                    className={!edit ? "cursor-pointer opacity-70 flex-1" : "flex-1"}
                                    onClick={() => !edit && copyToClipboard(url)}
                                    onChange={(e) =>
                                        setWebsites((w) =>
                                            w.map((u, idx) => (idx === i ? e.target.value : u))
                                        )
                                    }
                                />
                                {websites.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleRemoveUrl(i)}
                                        className="border-red-500 text-red-500"
                                        disabled={!edit}
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
                        <Textarea
                            placeholder="Any additional information"
                            rows={3}
                            {...register("notes")}
                            readOnly={!edit}
                            className={!edit ? "cursor-pointer opacity-70" : ""}
                            onClick={() => !edit && copyToClipboard(getValues("notes") || "")}
                        />
                    </div>

                    {/* Custom Fields */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <Label>Custom Fields</Label>
                            <Button
                                type="button"
                                size="sm"
                                onClick={handleAddCustom}
                                variant="outline"
                                disabled={!edit}
                            >
                                <Plus className="h-4 w-4 mr-1" /> Add Field
                            </Button>
                        </div>
                        {additional.map((field, i) => (
                            <div key={i} className="flex gap-2">
                                <Input
                                    placeholder="Label"
                                    value={field.label}
                                    readOnly={!edit}
                                    className={!edit ? "cursor-pointer opacity-70 flex-1" : "flex-1"}
                                    onClick={() => !edit && copyToClipboard(field.label || "")}
                                    onChange={(e) =>
                                        setAdditional((a) =>
                                            a.map((f, idx) =>
                                                idx === i ? { ...f, label: e.target.value } : f
                                            )
                                        )
                                    }
                                />
                                <Input
                                    placeholder="Value"
                                    value={field.value}
                                    readOnly={!edit}
                                    className={!edit ? "cursor-pointer opacity-70 flex-1" : "flex-1"}
                                    onClick={() => !edit && copyToClipboard(field.value || "")}
                                    onChange={(e) =>
                                        setAdditional((a) =>
                                            a.map((f, idx) =>
                                                idx === i ? { ...f, value: e.target.value } : f
                                            )
                                        )
                                    }
                                />
                                {additional.length > 1 && (
                                    <Button
                                        type="button"
                                        size="icon"
                                        onClick={() => handleRemoveCustom(i)}
                                        className="border-red-500 text-red-500"
                                        variant="outline"
                                        disabled={!edit}
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
                            {selectedTags.map((t) => (
                                <div
                                    key={t}
                                    className="flex items-center bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 px-3 py-1 rounded-full text-sm"
                                >
                                    {t}
                                    <Button
                                        onClick={() => handleRemoveTag(t)}
                                        className="ml-2 hover:bg-indigo-200 p-0.5 rounded-full"
                                        disabled={!edit}
                                    >
                                        <X className="w-3 h-3" />
                                    </Button>
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
                                readOnly={!edit}
                                className={
                                    !edit
                                        ? "cursor-not-allowed bg-gray-100 dark:bg-gray-700"
                                        : ""
                                }
                            />
                            {showTagDropdown && edit && (
                                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto">
                                    {filteredTags.map((t) => (
                                        <div
                                            key={t}
                                            onClick={() => handleAddTag(t)}
                                            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                        >
                                            {t}
                                        </div>
                                    ))}
                                    {tagInput.trim() && !tags.includes(tagInput.trim()) && (
                                        <div
                                            onClick={handleCreateTagLocally}
                                            className="px-4 py-2 text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center"
                                        >
                                            <Plus className="w-4 h-4 mr-2" /> Create “
                                            {tagInput.trim()}”
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
                                disabled={!edit}
                            >
                                Choose Files
                            </Button>
                            <span className="text-sm text-gray-500">
                                {selectedFiles.length > 0
                                    ? `${selectedFiles.length} files selected`
                                    : "No files chosen"}
                            </span>
                        </div>
                        <Input
                            id="file"
                            type="file"
                            multiple
                            className="hidden"
                            ref={fileInputRef}
                            disabled={!edit}
                            onChange={(e) => {
                                if (e.target.files) {
                                    setSelectedFiles((prev) => [
                                        ...prev,
                                        ...Array.from(e.target.files as FileList),
                                    ]);
                                    if (fileInputRef.current) fileInputRef.current.value = "";
                                }
                            }}
                        />
                        {selectedFiles.length > 0 && (
                            <div className="mt-2 p-2 border rounded-md bg-gray-50 dark:bg-gray-700">
                                <Label>Selected Files</Label>
                                <div className="space-y-2 mt-1">
                                    {selectedFiles.map((f, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-center bg-white dark:bg-gray-600 p-2 rounded shadow-sm"
                                        >
                                            <span className="text-sm truncate max-w-xs">
                                                {f.name}
                                            </span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    setSelectedFiles((prev) =>
                                                        prev.filter((_, i) => i !== idx)
                                                    )
                                                }
                                                className="text-red-500 border-red-500 hover:bg-red-50"
                                                disabled={!edit}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                            Optional file attachment
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => router.replace(CREDENTIALS_PAGE)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                            {id ? "Update" : "Save"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}