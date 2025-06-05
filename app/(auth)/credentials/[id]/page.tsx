"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconInput } from '@/components/ui/icon-Input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-Input';
import useCredentials from '@/hooks/use-Credentials';
import useTags from '@/hooks/use-Tags';
import { CredentialData } from '@/types/credentials';
import { TagResponse } from '@/types/tag';
import { Plus, Trash2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function CredentialsDetailPage() {
    const [data, setData] = useState<CredentialData | undefined>(undefined);
    const [tags, setTags] = useState<TagResponse | undefined>(undefined);
    const [customFields, setCustomFields] = useState([{ label: '', value: '' }]);
    const [urls, setUrls] = useState(['']);
    const [edit, setEdit] = useState(false);
    const { id } = useParams();
    const { getCredentialsDetails } = useCredentials();
    const { getTags } = useTags();

    const [otp, setOtp] = useState(generateRandomOtp());
    const [remainingSeconds, setRemainingSeconds] = useState(30);

    const addUrl = () => setUrls([...urls, '']);
    const removeUrl = (index: number) => {
        if (urls.length > 1) {
            setUrls(urls.filter((_, i) => i !== index));
        }
    };

    const addCustomField = () => setCustomFields([...customFields, { label: '', value: '' }]);
    const removeCustomField = (index: number) => {
        if (customFields.length > 1) {
            setCustomFields(customFields.filter((_, i) => i !== index));
        }
    };

    const fetchData = useCallback(async () => {
        if (!id) return;
        const res = await getCredentialsDetails(Number(id));
        const tagRes = await getTags({ limit: 10000 });
        if (tagRes) setTags(tagRes);
        if (res) {
            setData(res);
            setUrls(res.website || []);
        }
    }, [getCredentialsDetails, id, getTags]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    function generateRandomOtp() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    useEffect(() => {
        const updateTimer = () => {
            const currentTime = Math.floor(Date.now() / 1000);
            const secondsSinceEpoch = currentTime % 30;
            const remaining = 30 - secondsSinceEpoch;
            setRemainingSeconds(remaining);
            if (secondsSinceEpoch === 0) {
                setOtp(generateRandomOtp());
            }
        };

        updateTimer(); // Set initial values
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, []);

    const OtpTimer = ({ remainingSeconds }: { remainingSeconds: number }) => {
        const radius = 15;
        const circumference = 2 * Math.PI * radius;
        const progress = remainingSeconds / 30;
        const strokeDashoffset = circumference - (progress * circumference);

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
            </svg>
        );
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Credential Details</h1>
            <p>Details for credential with ID: {id}</p>
            {data && (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Credential Details{' '}
                            <Button variant={edit ? 'default' : 'outline'} onClick={() => setEdit(!edit)}>
                                Edit
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <IconInput id="name" label="Name" value={data.name} disabled={!edit} />
                        <IconInput id="username" label="Username" value={data.username} disabled={!edit} />
                        <PasswordInput id="password" label="Password" value={data.pass} disabled={!edit} />
                        {edit ? (
                            <PasswordInput
                                id="two_factor_secret"
                                label="One Time Password"
                                value={data?.two_factor_secret || ''}
                                disabled={!edit}
                            />
                        ) : (
                            <div className="space-y-2">
                                <Label>OTP</Label>
                                <div className="flex items-center gap-2">
                                    <Input disabled className="text-lg font-mono w-30" value={otp} />
                                    <OtpTimer remainingSeconds={remainingSeconds} />
                                </div>
                            </div>
                        )}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">URLs</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addUrl}
                                    className="gap-1 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-gray-700"
                                    disabled={!edit}
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
                                            disabled={!edit}
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
                        <IconInput
                            id="notes"
                            label="Notes"
                            value={data?.note as string}
                            placeholder="No notes provided"
                            disabled={!edit}
                        />
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Custom Fields
                                </Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addCustomField}
                                    className="gap-1 border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-gray-700"
                                    disabled={!edit}
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
                                            disabled={!edit}
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
                                            disabled={!edit}
                                        />
                                        {customFields.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => removeCustomField(index)}
                                                className="shrink-0 border-red-500 text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700"
                                                disabled={!edit}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}