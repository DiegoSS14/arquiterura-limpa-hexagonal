import knex, { type Knex } from "knex";
import * as knexfileModule from "./knexfile.cjs";

const config = (knexfileModule as { default?: { development?: Knex.Config } }).default ?? (knexfileModule as { development?: Knex.Config });

export default knex(config.development as Knex.Config);