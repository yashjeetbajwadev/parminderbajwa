"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ListingsResponse } from "@/types/pocketbase";
import { ListResult } from "pocketbase";
import { ListingsList } from "./ListingsList";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ListingsTabListProps = {
    tab: string;
    activeListings: ListResult<ListingsResponse>;
    soldListings: ListResult<ListingsResponse>;
};

export const ListingsTabList = ({ activeListings, soldListings, tab }: ListingsTabListProps) => {
    return (
        <Tabs defaultValue={tab}>
            <TabsList className="flex justify-center items-center align-middle mt-10 space-x-4">
                <ListingsTab text={`For Sale (${activeListings.totalItems})`} value="active" />
                <ListingsTab text={`Recently Sold (${soldListings.totalItems})`} value="sold" />
            </TabsList>
            <TabsContent value="active">
                <ListingsList data={activeListings} />
            </TabsContent>
            <TabsContent value="sold">
                <ListingsList data={soldListings} sold />
            </TabsContent>
        </Tabs>
    );
};

function ListingsTab({ text, value }: Readonly<{ text: string; value: string }>) {
  const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams()
  return (
    <TabsTrigger value={value} onClick={()=>{
        let newSearch = new URLSearchParams(searchParams)
        newSearch.set('tab', value)
        let newUrl = new URL(pathname, window.location.origin);
        router.push(newUrl.toString())
    }}>
        {text}
    </TabsTrigger>
    )
}

