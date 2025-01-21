import { useEffect, useState } from "react";
import { useSearchDocumentsMutation, useSearchMutation } from "../redux/services/api/searchApi";
import { useAppSelector } from "../redux/services/hooks";
import { DocumentsReq, DocumentsRes, ScanDoc, SearchRes } from "../types";
import { DocumentCardComponent } from "./DocumentCard";
import styled from "styled-components";
import { ButtonComponent } from "./Buttons/Button";

const StyledDocumentsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const StyledDocuments = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
  max-width: 1320px;
  flex-wrap: wrap;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto;
`;


export const DocumentsComponent = () => {
  const limitFromState = useAppSelector((state) => state.searchReducer.limit);

  const [search] = useSearchMutation();
  const searchReq = useAppSelector((state) => state.searchReducer)
  const [searchRes, setSearchRes] = useState<SearchRes | null>(null);

  const [ids, setIds] = useState<string[] | null>(null);

  const [searchDocuments] = useSearchDocumentsMutation();
  const [documentsReq, setDocumentsReq] = useState<DocumentsReq | null>(null);
  const [documentsRes, setDocumentsRes] = useState<DocumentsRes[] | null>(null);

  const [prevLimit, setPrevLimit] = useState(0);
  const [limit, setLimit] = useState(10);

  const [documents, setDocuments] = useState<ScanDoc[]>([]);

  const handleLoadMore = async () => {
    if (ids) {
      try {
        const result = await searchDocuments({ ids: ids.slice(prevLimit, limit)});
        if (result.data) {
          setDocumentsRes(result.data);
          setDocuments((prev) => [...prev, ...result.data.map((item) => item.ok)]);
          setPrevLimit((prev) => prev + 10);
          setLimit((prev) => prev + 10);
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  useEffect(() => {
    if (searchReq) {
      const fetchData = async () => {
        try {
          const result = await search(searchReq);
          if (result.data) {
            setSearchRes(result.data);
          }
        } catch (e) {
          console.error(e)
        }
      };

      fetchData();
    }
  }, [searchReq, search]);

  useEffect(() => {
    if (searchRes) {
      setIds(searchRes.items.map((item) => item.encodedId));
    }
  }, [searchRes]);

  useEffect(() => {
    console.log(`p: ${prevLimit}, l: ${limit}`)
  }, [prevLimit, limit]);

  useEffect(() => {
    if (ids) {
      const fetchData = async () => {
          try {
            const result = await searchDocuments({ ids: ids.slice(prevLimit, limit)});
            if (result.data) {
              setDocumentsRes(result.data);
              setDocuments(result.data.map((item) => item.ok));
              setPrevLimit((prev) => prev + 10);
              setLimit((prev) => prev + 10);
            }
          } catch (e) {
            console.error(e)
          }
        }
  
      fetchData()
    }
  }, [ids]);

  useEffect(() => {
    if (documentsRes) {
      console.log(documentsRes)
    }
  }, [documentsRes]);

  return (
    <StyledDocumentsWrapper>
      {documents.length > 0 && (
        <StyledDocuments>
          {documents.map((doc) => (
            <DocumentCardComponent key={doc.id} {...doc} />
          ))}
          <StyledButtonWrapper>
            {limitFromState && prevLimit < limitFromState && (
              <ButtonComponent 
                onClick={handleLoadMore} 
                text="Показать больше" 
                font={'medium'}
                type={'submit'}
                width={'100%'} 
              />
            )}
          </StyledButtonWrapper>
        </StyledDocuments>
      )}
    </StyledDocumentsWrapper>
  )
}