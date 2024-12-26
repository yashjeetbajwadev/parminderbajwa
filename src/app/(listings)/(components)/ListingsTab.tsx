"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListingsResponse } from "@/types/pocketbase";
import { useRouter } from "next/navigation";
import { ListResult } from "pocketbase";
import { ListingsList } from "./ListingsList";

type ListingsTabListProps = {
    tab: string;
    activeListings: ListResult<ListingsResponse>;
    soldListings: ListResult<ListingsResponse>;
};

export const ListingsTabList = ({ activeListings, soldListings, tab }: ListingsTabListProps) => {
    return (
        <Tabs defaultValue={tab}>
            <TabsList className="flex justify-center items-center align-middle mt-10 space-x-4">
                <ListingsTab text={`For Sale (${activeListings.totalItems})`} value="listings/1" />
                <ListingsTab text={`Recently Sold (${soldListings.totalItems})`} value="sold/1" />
            </TabsList>
            <TabsContent value="listings/1">
                {tab === "listings/1" && <ListingsList data={activeListings} />}
            </TabsContent>
            <TabsContent value="sold/1">
                {tab === "sold/1" && <ListingsList data={soldListings} sold />}
            </TabsContent>
        </Tabs>
    );
};

function ListingsTab({ text, value }: Readonly<{ text: string; value: string }>) {
    const router = useRouter();
    return (
        <TabsTrigger value={value} onClick={() => router.push("/" + value) }>
            {text}
        </TabsTrigger>
    )
}

