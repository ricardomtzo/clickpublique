
import React, { useState } from "react";
import { Dropdown, DropdownChangeEvent, DropdownProps } from 'primereact/dropdown';


export default function SelectSearch(props: DropdownProps) {
    const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
    const countries: any[] = [
        { name: '', id: '0' }
    ];

    const selectedCountryTemplate = (option: any, props: any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <Dropdown
            filter
            value={selectedCountry}
            options={props.options || countries}
            optionLabel="name"
            className="w-full md:w-14rem border my-[10px]"
            valueTemplate={selectedCountryTemplate}
            itemTemplate={countryOptionTemplate}
            onChange={(e: DropdownChangeEvent) => setSelectedCountry(e.value)}
            {...props} />
    )
}
