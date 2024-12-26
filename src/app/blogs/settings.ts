import { CommonAPIProps } from "@/lib/utils";
import { ListOptions } from "pocketbase";

export function BlogsListConfig(
  page: string,
  extraOptions?: ListOptions
): CommonAPIProps<"blogs"> {
  let options: ListOptions = {
    fields:
      "id,title,description,created,updated,author,images,body:excerpt(135,true)",
    filter: "active=true",
    page: Number(page ?? 1),
  };

  return {
    collectionName: "blogs",
    options: { ...options, ...extraOptions },
  };
}
