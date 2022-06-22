/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { MaterialGroup } from "./materialGroup";
import type { Periodical } from "./periodical";

export interface FeeMaterialV2 {
  materialGroup: MaterialGroup;
  /** Identifies the exact material covered by the fee */
  materialItemNumber: string;
  periodical?: Periodical;
  /** The FAUST number of the bibliographic record */
  recordId: string;
}
