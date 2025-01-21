import styled from "styled-components";
import { ScanDoc } from "../types";
import { getDate, parseXML } from "../utils/helpers";
import { colors } from "../styles/globalStyles";
import { useNavigate } from "react-router-dom";

const StyledDoc = styled.article`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 20px 30px 20px 30px;
  width: 100%;
  max-width: 640px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 10px;
`;

const StyledDocTop = styled.div`
  font-size: 16px;
  line-height: 19.36px;
  letter-spacing: 0.02em;
  text-align: left;
  color: rgba(148, 148, 148, 1);
  display: flex;
  gap: 14px;

  & a {
    color: rgba(148, 148, 148, 1);
  }
`;

const StyledDocMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const StyledDocTitle = styled.h3`
  margin: 0;
  font-size: 26px;
  font-weight: 500;
  line-height: 31.47px;
  letter-spacing: 0.02em;
  text-align: left;
`;

const StyledDocAttributesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const StyledDocAttribute = styled.div`
  border-radius: 5px;
  font-size: 12px;
  line-height: 14.52px;
  letter-spacing: 0.02em;
  background: rgba(255, 182, 79, 1);
`;

const StyledDocContent = styled.div`
  color: rgba(0, 0, 0, 0.5);
  line-height: 19.36px;
  letter-spacing: 0.02em;
  text-align: left;
  //max-height: 400px;
  //overflow: hidden;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -moz-box;
  -moz-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
  line-clamp: 12;
  box-orient: vertical;
`;

const StyledDocBottom = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  color: rgba(148, 148, 148, 1);
`;

const StyledDocButton = styled.button`
  border: 0;
  color: black;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  background-color: ${colors.secondary.lightTeal};
  cursor: pointer;
  border-radius: 5px;
  padding: 14px 30px;
  font-size: 16px;
  transition: 500ms;
  z-index: 1;
  font-family: Inter;
  line-height: 19.36px;
  letter-spacing: 0.02em;

  &:hover {
    background: ${colors.secondary.lightTealHover};
  }
`;

export const DocumentCardComponent = (document: ScanDoc) => {
  const navigate = useNavigate();
  const {issueDate, source, title, attributes, content, url} = document;

  const htmlContent = parseXML(content.markup) || '';

  return (
    <StyledDoc>
      <StyledDocTop>
        <span>{getDate(issueDate.toString(), true)}</span>
        <a href={url}>{source.name}</a>
      </StyledDocTop>
      <StyledDocMain>
        <StyledDocTitle>
          {title.text}
        </StyledDocTitle>
        <StyledDocAttributesContainer>
          {/* {JSON.stringify(attributes)} */}
        </StyledDocAttributesContainer>
        <StyledDocContent dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </StyledDocMain>
      <StyledDocBottom>
      <StyledDocButton onClick={() => navigate(url)}>Читать в источнике</StyledDocButton>
      <span>{attributes.wordCount} слов</span>
      </StyledDocBottom>
    </StyledDoc>
  )
}