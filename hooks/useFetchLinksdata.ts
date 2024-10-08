import { UserFolder } from "@/api/folder";
import { MappedDataProps } from "@/types/mappedFolderTypes";
import { useEffect, useState } from "react";

function useFetchLinksData(fetchFunc: Function, targetArr: UserFolder[]) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (targetArr.length < 1) {
      return;
    }
    setIsLoading(true);
    fetchFunc(targetArr).then((result: MappedDataProps) => {
      setData(result);
    });
  }, [targetArr]);

  return [data, isLoading];
}

export default useFetchLinksData;
