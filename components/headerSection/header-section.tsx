"use client";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/ui/icon-Input";
import { Label } from "@/components/ui/label";
import { Search } from "@/components/ui/search";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReactNode } from "react";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Define the filter configuration type
interface FilterConfig {
    key: string;
    label: string;
    type: "date" | "month" | "select";
    options?: (string | { value: string | number; label: string })[];
    onChange?: (value: string) => string;
    render?: (
        params: Record<string, string>,
        applyFilter: ((key: string, value: string | null) => void) | undefined,
        applyFilters: ((filters: Record<string, string>) => void) | undefined
    ) => ReactNode;
}

// Define the props for the DynamicHeader component
interface DynamicHeaderProps {
    section: string;
    filterConfigs?: FilterConfig[];
    params: Record<string, string>;
    applyFilter?: (key: string, value: string | null) => void;
    // applyFilters?: (filters: Record<string, string>) => void;
    resetAll?: () => void;
    addButton?: ReactNode;
    gridClass?: string;
    additionalComponents?: ReactNode | null;
}

// Utility function for month format conversion
const toYYYYMM = (value: string): string => {
    const [month, year] = value.split("-");
    return `${year}-${month}`;
};

const DynamicHeader = ({
    section,
    filterConfigs = [],
    params,
    applyFilter,
    resetAll,
    addButton,
    gridClass = "grid grid-cols-1 gap-4 md:grid-cols-5",
    additionalComponents = null,
}: DynamicHeaderProps) => {
    const renderFilters = () => {
        return filterConfigs.map((config) => {

            // Default rendering for date inputs with Flatpickr
            if (config.type === "date") {
                return (
                    <div key={config.key} className="space-y-2">
                        <Label htmlFor={config.key} className="text-sm font-medium text-gray-700">
                            {config.label}
                        </Label>
                        <Flatpickr
                            id={config.key}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={params[config.key] || ""}
                            placeholder={`Select ${config.label.toLowerCase()}`}
                            onChange={(_, dateStr) => {
                                if (applyFilter) {
                                    applyFilter(config.key, dateStr || null);
                                }
                            }}
                            options={{
                                dateFormat: "Y-m-d",
                                altInput: true,
                                altFormat: "M j, Y",
                                allowInput: true,
                            }}
                            aria-label={`Filter by ${config.label.toLowerCase()}`}
                        />
                    </div>
                );
            }

            // Default rendering for month inputs
            if (config.type === "month") {
                return (
                    <div key={config.key} className="space-y-2">
                        <IconInput
                            id={config.key}
                            label={config.label}
                            type="month"
                            className="w-full rounded-md border-gray-300 focus:ring-blue-500"
                            value={
                                params[config.key] ? toYYYYMM(params[config.key]) : ""
                            }
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (applyFilter) {
                                    const value = config.onChange ? config.onChange(e.target.value) : e.target.value;
                                    applyFilter(config.key, value || null);
                                }
                            }}
                        />
                    </div>
                );
            }

            // Default rendering for select inputs
            if (config.type === "select") {
                const selectOptions = config.options || [];
                return (
                    <div key={config.key} className="space-y-2">
                        <Label htmlFor={config.key} className="text-sm font-medium text-gray-700">
                            {config.label}
                        </Label>
                        <Select
                            value={params[config.key]?.toString() || "all"}
                            onValueChange={(value: string) => {
                                if (
                                    config.key === "tag_ids" ||
                                    config.key === "leave_type" ||
                                    config.key === "status"
                                ) {
                                    if (applyFilter) {
                                        applyFilter(config.key, value);
                                    }
                                }
                            }
                            }
                        >
                            <SelectTrigger
                                id={config.key}
                                className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                            >
                                <SelectValue placeholder={`Select ${config.label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                                {selectOptions.map((option) => {
                                    const value = typeof option === "object" ? option.value : option;
                                    const label = typeof option === "object" ? option.label : option;
                                    return (
                                        <SelectItem key={value as string} value={value.toString()}>
                                            {label.charAt(0).toUpperCase() + label.slice(1)}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                );
            }
            return null; // Fallback for unsupported types
        });
    };

    return (
        <div className={gridClass}>
            {renderFilters()}
            <div className="space-y-2">
                <Search />
            </div>
            {additionalComponents}
            <div className="mt-6 flex items-center justify-between w-full">
                {resetAll && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={resetAll}
                        className="w-full md:w-auto rounded-md border-blue-500 text-blue-500 hover:bg-blue-50"
                    >
                        Reset Filters
                    </Button>
                )}
                {addButton}
            </div>
        </div>
    );
};

export default DynamicHeader;