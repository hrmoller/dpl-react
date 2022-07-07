import { UseComboboxPropGetters } from "downshift";
import React from "react";
import {
  SuggestionsFromQueryStringQuery,
  SuggestionType
} from "../../core/dbc-gateway/generated/graphql";
import { Suggestion, Suggestions } from "../../core/utils/types/autosuggest";
import AutosuggestMaterial from "../autosuggest-material/autosuggest-material";
import { AutosuggestText } from "../autosuggest-text/autosuggest-text";

export interface AutosuggestProps {
  originalData:
    | SuggestionsFromQueryStringQuery["suggest"]["result"]
    | undefined;
  textData: SuggestionsFromQueryStringQuery["suggest"]["result"];
  materialData: Suggestions;
  isLoading: boolean;
  status: string;
  getMenuProps: UseComboboxPropGetters<unknown>["getMenuProps"];
  highlightedIndex: number;
  getItemProps: UseComboboxPropGetters<Suggestion>["getItemProps"];
  isOpen: boolean;
}

export const Autosuggest: React.FC<AutosuggestProps> = ({
  originalData,
  textData,
  materialData,
  isLoading,
  status,
  getMenuProps,
  highlightedIndex,
  getItemProps,
  isOpen
}) => {
  if (originalData) {
    originalData.forEach((item) => {
      if (item.type === SuggestionType.Composit) {
        if (materialData.length < 3) {
          materialData.push(item);
          return;
        }
      }
      textData.push(item);
    });
  }

  return (
    <>
      {/* eslint-disable react/jsx-props-no-spreading */}
      {/* The downshift combobox works this way by design */}
      <ul
        className="autosuggest pb-16"
        {...getMenuProps()}
        style={!isOpen ? { display: "none" } : {}}
      >
        {/* eslint-enable react/jsx-props-no-spreading */}

        {isLoading && <div>Loading</div>}

        {originalData && status && isOpen && (
          <>
            <AutosuggestText
              textData={textData}
              highlightedIndex={highlightedIndex}
              getItemProps={getItemProps}
            />
            <AutosuggestMaterial
              materialData={materialData}
              getItemProps={getItemProps}
              highlightedIndex={highlightedIndex}
              textDataLength={textData.length}
            />
          </>
        )}
      </ul>
    </>
  );
};
