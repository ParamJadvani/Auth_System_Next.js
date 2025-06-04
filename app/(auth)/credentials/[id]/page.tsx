"use client";
import useCredentials from '@/hooks/use-Credentials';
import useTags from '@/hooks/use-Tags';
import { CredentialData } from '@/types/credentials';
import { TagResponse } from '@/types/tag';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function CredentialsDetailPage() {
    const [data, setData] = useState<CredentialData | undefined>(undefined);
    const [tags, setTags] = useState<TagResponse | undefined>(undefined);
    const { id } = useParams();
    const { getCredentialsDetails } = useCredentials();
    const { getTags } = useTags();

    const fetchData = useCallback(async () => {
        if (!id) return;
        const res = await getCredentialsDetails(Number(id));
        const tagRes = await getTags({ limit: 10000 });
        if (tagRes) {
            setTags(tagRes);
        }
        if (res) {
            setData(res);
        }
    }, [getCredentialsDetails, id, getTags]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Credential Details</h1>
            <p>Details for credential with ID: {id}</p>
            {data && (
                <div>
                    <h2 className="text-xl font-bold">Credential Details</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <h3 className="text-lg font-medium">Name</h3>
                                <p className="text-sm text-gray-500">{data.name}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <h3 className="text-lg font-medium">Username</h3>
                                <p className="text-sm text-gray-500">{data.username}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <h3 className="text-lg font-medium">Password</h3>
                                <p className="text-sm text-gray-500">{data.pass}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">Website</h3>
                                <div className="flex items-center gap-2">
                                    {data.website.length > 0 ? (
                                        data.website.map((site, index) => (
                                            <Link
                                                key={index}
                                                href={site}
                                                target="_blank"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {site}
                                            </Link>
                                        ))
                                    ) : (
                                        <span className="text-gray-500">No website provided</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">Notes</h3>
                                <p className="text-sm text-gray-500">{data.note ?? "No notes provided"}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tags?.data?.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div >
    );
}