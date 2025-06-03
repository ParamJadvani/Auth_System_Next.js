import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconInput } from '@/components/ui/icon-Input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function AddCredentialsPage() {
    return <>
        <Card>
            <CardHeader>
                <CardTitle>Add New Credential</CardTitle>
            </CardHeader>
            <CardContent>
                <form className='space-y-6'>
                    <IconInput label="Name" id="name" placeholder="Enter Name" />
                    <IconInput label="Username" id="username" placeholder="Enter Username" />
                    <IconInput label="Password" id="password" placeholder="Enter Password" />
                    {/* Multiple-Dynamic fields */}
                    <IconInput label="URL" id="url" placeholder="Enter URL" />
                    <div>
                        <Label>
                            Note
                        </Label>
                        <Textarea placeholder='Enter Note' />
                    </div>
                    {/* Multiple-Dynamic fields */}
                    <div className='flex justify-between items-center'>
                        <IconInput label="Label (e.g., Enter a key or name for the data)" id='label' placeholder='Enter Label' />
                        <IconInput label="Value (e.g., Enter a value corresponding to the label)" id='type' placeholder='Enter Value' />
                    </div>
                    <div>
                        <Label>Tags</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select tags" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Tag 1</SelectItem>
                                <SelectItem value="2">Tag 2</SelectItem>
                                <SelectItem value="3">Tag 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>
                            Credentials File
                        </Label>
                        <Input type='file' placeholder='Upload a file' />
                    </div>
                </form>
            </CardContent>
        </Card>
    </>
}