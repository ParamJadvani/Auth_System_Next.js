"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import {
    Plus,
    Trash2,
    X,
    Copy,
    Eye,
    EyeOff,
    FileText,
    Pencil,
    Lock,
} from "lucide-react";
import { toast } from "react-toastify";
import { authenticator } from "otplib";

// Shadcn UI Components
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PasswordInput } from "@/components/ui/password-Input";

// Local Imports
import authStore from "@/store/authStore";
import useCredentials from "@/hooks/use-Credentials";
import useTags from "@/hooks/use-Tags";
import { CREDENTIALS_PAGE } from "@/constants/redirect";
import { CredentialFormValues } from "@/types/credentials";
import { Tag } from "@/types/tag";

// --- Helper Component for View Mode ---
const DisplayField = ({
    label,
    value,
    isPassword = false,
    isLink = false,
}: {
    label: string;
    value: string;
    isPassword?: boolean;
    isLink?: boolean;
}) => {
    const [isRevealed, setIsRevealed] = useState(false);

    const copyToClipboard = async () => {
        if (!value) return;
        await navigator.clipboard.writeText(value);
        toast.success(`Copied "${label}" to clipboard`);
    };

    const displayValue = isPassword
        ? isRevealed
            ? value
            : "••••••••••••"
        : value;

    return (
        <div className="group flex flex-col space-y-1">
            <Label className="text-sm text-muted-foreground">{label}</Label>
            <div className="flex items-center justify-between">
                {isLink ? (
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline truncate"
                    >
                        {value}
                    </a>
                ) : (
                    <p className="text-base truncate">{displayValue}</p>
                )}
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isPassword && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => setIsRevealed(!isRevealed)}
                        >
                            {isRevealed ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </Button>
                    )}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={copyToClipboard}
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Section Component ---
const FormSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="space-y-4 pt-6 border-t first:border-t-0 first:pt-0">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);


// --- Main Page Component ---
export default function AddCredentialsPage() {
    const { register, handleSubmit, reset, getValues, watch } =
        useForm<CredentialFormValues>();
    const [edit, setEdit] = useState(false);
    const [websites, setWebsites] = useState([""]);
    const [additional, setAdditional] = useState<
        { label: string; value: string }[]
    >([{ label: "", value: "" }]);
    const [tags, setTags] = useState<string[]>([]);
    const [tagsInfo, setTagsInfo] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [showTagDropdown, setShowTagDropdown] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isClient, setIsClient] = useState(false);

    const tagInputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Hooks and Store ---
    const { getCredentialsDetails, updateCredentials } =
        useCredentials();
    const { getTags, addTag } = useTags();
    const user = authStore((s) => s.user);
    const router = useRouter();
    const { slug_id } = useParams();

    // --- TOTP Setup ---
    const secret = watch("two_factor_secret") || "";
    const [otp, setOtp] = useState("");
    const [remainingSeconds, setRemainingSeconds] = useState(0);

    useEffect(() => {
        setIsClient(true);
        if (!slug_id) setEdit(true);
    }, [slug_id]);

    useEffect(() => {
        if (!isClient || !secret) return;
        authenticator.options = { step: 30, digits: 6 };

        try {
            const updateTimer = () => {
                const remaining = authenticator.timeRemaining();
                setRemainingSeconds(remaining);
                setOtp(authenticator.generate(secret));
            };
            updateTimer();
            const interval = setInterval(updateTimer, 1000);
            return () => clearInterval(interval);
        } catch {
            setOtp("");
            setRemainingSeconds(0);
        }
    }, [isClient, secret]);

    // --- Data Fetching ---
    useEffect(() => {
        (async () => {
            const res = await getTags({ limit: 10000 });
            if (res) {
                setTags(res.data.map((t) => t.name));
                setTagsInfo(res.data);
            }
        })();
    }, [getTags]);

    useEffect(() => {
        if (!slug_id) return;
        (async () => {
            const detail = await getCredentialsDetails(Number(slug_id));
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
                setWebsites(detail.website?.length ? detail.website : [""]);
                setAdditional(
                    detail.additional?.length ? detail.additional : [{ label: "", value: "" }]
                );
                setSelectedTags(detail.tags?.map((t) => t.name) || []);
            }
        })();
    }, [slug_id, getCredentialsDetails, reset]);

    // --- Form Field Handlers ---
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
            if (match) handleAddTag(match);
            else handleCreateTagLocally();
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

        const tag_ids: number[] = selectedTags
            .map((tagName) => {
                const match = refreshedTagsInfo.find(
                    (t) => t.name.toLowerCase() === tagName.toLowerCase()
                );
                return match ? match.id : undefined;
            })
            .filter((id): id is number => id !== undefined);

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("notes", form.notes || "");
        formData.append("two_factor_secret", "");

        websites
            .filter((url) => url.trim())
            .forEach((url, idx) => formData.append(`website[${idx}]`, url));

        additional
            .filter((f) => f.label.trim())
            .forEach((field, idx) => {
                formData.append(`additional[${idx}][label]`, field.label);
                formData.append(`additional[${idx}][value]`, field.value);
            });

        tag_ids.forEach((id, idx) => formData.append(`tag_ids[${idx}]`, String(id)));

        await updateCredentials(
            formData as unknown as CredentialFormValues,
            form.id as number,
            user?.user?.id as number
        );
    };

    const OtpTimer = ({ remaining }: { remaining: number }) => {
        const progress = (remaining / 30) * 100;
        return (
            <div className="relative h-6 w-6">
                <svg className="h-full w-full" viewBox="0 0 20 20">
                    <circle
                        className="stroke-current text-gray-200"
                        cx="10"
                        cy="10"
                        r="8"
                        strokeWidth="2"
                        fill="transparent"
                    />
                    <circle
                        className="stroke-current text-blue-500"
                        cx="10"
                        cy="10"
                        r="8"
                        strokeWidth="2"
                        fill="transparent"
                        strokeDasharray="50.265"
                        strokeDashoffset={50.265 - (progress / 100) * 50.265}
                        transform="rotate(-90 10 10)"
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-mono">
                    {remaining}
                </span>
            </div>
        );
    };

    return (
        <Card className="mx-auto w-full bg-card shadow-2xl shadow-gray-200/50 dark:shadow-black/50">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            {slug_id ? (
                                <Lock className="w-6 h-6 text-primary" />
                            ) : (
                                <Plus className="w-6 h-6 text-primary" />
                            )}
                            {slug_id ? "View Credentials" : "Add New Credentials"}
                        </CardTitle>
                        <CardDescription>
                            {edit
                                ? "You are currently in edit mode."
                                : "View details or click Edit to make changes."}
                        </CardDescription>
                    </div>
                    {slug_id && (
                        <Button
                            type="button"
                            onClick={() => setEdit(!edit)}
                            variant={edit ? "secondary" : "default"}
                            size="sm"
                        >
                            <Pencil className="w-4 h-4 mr-2" />
                            {edit ? "Cancel Edit" : "Edit"}
                        </Button>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    {/* Core Credentials */}
                    <FormSection title="Core Credentials">
                        {edit ? (
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" {...register("name")} />
                                </div>
                                <div>
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" {...register("username")} />
                                </div>
                                <div>
                                    <PasswordInput
                                        type="password"
                                        label="Password"
                                        id="password"
                                        {...register("password")}
                                    />
                                </div>
                                <div>
                                    <PasswordInput
                                        type="text"
                                        label="2FA Secret Key"
                                        id="two_factor_secret"
                                        {...register("two_factor_secret")}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                <DisplayField
                                    label="Name"
                                    value={getValues("name")}
                                />
                                <DisplayField
                                    label="Username"
                                    value={getValues("username")}
                                />
                                <DisplayField
                                    label="Password"
                                    value={getValues("password")}
                                    isPassword
                                />
                                {isClient && secret && otp && (
                                    <div className="group flex flex-col space-y-1">
                                        <Label className="text-sm text-muted-foreground">
                                            One-Time Password
                                        </Label>
                                        <div className="flex items-center justify-between">
                                            <p className="text-2xl font-mono tracking-widest">
                                                {otp}
                                            </p>
                                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <OtpTimer remaining={remainingSeconds} />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7"
                                                    onClick={async () => {
                                                        await navigator.clipboard.writeText(otp);
                                                        toast.success("OTP Copied!");
                                                    }}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </FormSection>

                    {/* Websites */}
                    <FormSection title="Websites">
                        {edit
                            ? websites.map((url, i) => (
                                <div key={i} className="flex gap-2 items-end">
                                    <div className="flex-grow">
                                        <Label htmlFor={`website-${i}`}>URL {i + 1}</Label>
                                        <Input
                                            id={`website-${i}`}
                                            type="url"
                                            value={url}
                                            onChange={(e) =>
                                                setWebsites((w) =>
                                                    w.map((u, idx) =>
                                                        idx === i ? e.target.value : u
                                                    )
                                                )
                                            }
                                        />
                                    </div>
                                    {websites.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveUrl(i)}
                                        >
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                    )}
                                </div>
                            ))
                            : websites
                                .filter((w) => w)
                                .map((url, i) => (
                                    <DisplayField
                                        key={i}
                                        label={`URL ${i + 1}`}
                                        value={url}
                                        isLink
                                    />
                                ))}
                        {edit && (
                            <Button
                                type="button"
                                size="sm"
                                onClick={handleAddUrl}
                                variant="outline"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add URL
                            </Button>
                        )}
                    </FormSection>

                    {/* Additional Info */}
                    <FormSection title="Additional Information">
                        <div>
                            <Label className="font-medium">Notes</Label>
                            {edit ? (
                                <Textarea
                                    {...register("notes")}
                                    rows={4}
                                    className="mt-1"
                                />
                            ) : (
                                <p className="mt-1 text-sm text-muted-foreground border p-3 rounded-md whitespace-pre-wrap">
                                    {getValues("notes") || "No notes provided."}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label className="font-medium">Custom Fields</Label>
                            <div className="space-y-4 mt-2">
                                {edit
                                    ? additional.map((field, i) => (
                                        <div key={i} className="flex gap-2 items-end">
                                            <div className="flex-grow">
                                                <Label htmlFor={`custom-label-${i}`}>
                                                    Label
                                                </Label>
                                                <Input
                                                    id={`custom-label-${i}`}
                                                    value={field.label}
                                                    onChange={(e) =>
                                                        setAdditional((a) =>
                                                            a.map((f, idx) =>
                                                                idx === i
                                                                    ? { ...f, label: e.target.value }
                                                                    : f
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <Label htmlFor={`custom-value-${i}`}>
                                                    Value
                                                </Label>
                                                <Input
                                                    id={`custom-value-${i}`}
                                                    value={field.value}
                                                    onChange={(e) =>
                                                        setAdditional((a) =>
                                                            a.map((f, idx) =>
                                                                idx === i
                                                                    ? { ...f, value: e.target.value }
                                                                    : f
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                            {additional.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleRemoveCustom(i)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            )}
                                        </div>
                                    ))
                                    : additional
                                        .filter((f) => f.label)
                                        .map((field, i) => (
                                            <DisplayField
                                                key={i}
                                                label={field.label}
                                                value={field.value}
                                            />
                                        ))}
                                {edit && (
                                    <Button
                                        type="button"
                                        size="sm"
                                        onClick={handleAddCustom}
                                        variant="outline"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Field
                                    </Button>
                                )}
                            </div>
                        </div>
                    </FormSection>

                    {/* Tags */}
                    <FormSection title="Organization (Tags)">
                        <div className="flex flex-wrap gap-2">
                            {selectedTags.map((t) => (
                                <Badge
                                    key={t}
                                    variant="secondary"
                                    className="text-base py-1 px-3"
                                >
                                    {t}
                                    {edit && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-4 w-4 ml-2"
                                            onClick={() => handleRemoveTag(t)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    )}
                                </Badge>
                            ))}
                        </div>
                        {edit && (
                            <div className="relative" ref={tagInputRef}>
                                <Input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onFocus={() => setShowTagDropdown(true)}
                                    onKeyDown={handleTagKeyDown}
                                    placeholder="Type to add or create a tag..."
                                />
                                {showTagDropdown && (
                                    <div className="absolute z-10 mt-1 w-full bg-background border rounded-md shadow-lg max-h-48 overflow-auto">
                                        {filteredTags.map((t) => (
                                            <div
                                                key={t}
                                                onClick={() => handleAddTag(t)}
                                                className="px-4 py-2 hover:bg-muted cursor-pointer"
                                            >
                                                {t}
                                            </div>
                                        ))}
                                        {tagInput.trim() && !tags.includes(tagInput.trim()) && (
                                            <div
                                                onClick={handleCreateTagLocally}
                                                className="px-4 py-2 text-primary hover:bg-muted cursor-pointer flex items-center"
                                            >
                                                <Plus className="w-4 h-4 mr-2" /> Create “
                                                {tagInput.trim()}”
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </FormSection>

                    {/* File Attachments */}
                    <FormSection title="File Attachments">
                        {edit ? (
                            <>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors"
                                >
                                    <FileText className="w-10 h-10 text-muted-foreground mb-2" />
                                    <p className="text-muted-foreground">
                                        Click to browse or drag & drop files
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Max file size 10MB
                                    </p>
                                    <Input
                                        id="file"
                                        type="file"
                                        multiple
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={(e) => {
                                            if (e.target.files)
                                                setSelectedFiles((prev) => [
                                                    ...prev,
                                                    ...Array.from(e.target.files as FileList),
                                                ]);
                                        }}
                                    />
                                </div>
                                {selectedFiles.length > 0 && (
                                    <div>
                                        <Label>Newly Selected Files</Label>
                                        <div className="space-y-2 mt-2">
                                            {selectedFiles.map((f, idx) => (
                                                <div
                                                    key={`${f.name}-${idx}`}
                                                    className="flex justify-between items-center bg-muted p-2 rounded"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-5 h-5 text-muted-foreground" />
                                                        <span className="text-sm truncate max-w-xs">
                                                            {f.name}
                                                        </span>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            setSelectedFiles((prev) =>
                                                                prev.filter((_, i) => i !== idx)
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-sm text-muted-foreground">
                                No attachments or view mode not implemented for files.
                            </div>
                        )}
                    </FormSection>

                    {/* Floating Action Bar for Edit Mode */}
                    {edit && (
                        <div className="sticky bottom-0 -mx-6 -mb-6 p-4 bg-background/80 backdrop-blur-sm border-t">
                            <div className="max-w-4xl mx-auto flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push(CREDENTIALS_PAGE)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    {slug_id ? "Save Changes" : "Create Credential"}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}