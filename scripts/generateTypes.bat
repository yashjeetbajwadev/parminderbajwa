@echo off

set DB_PATH=D:/workSpace/parminderBajwaPB/pb_data/data.db
set OUTPUT_FILE=D:/workSpace/parminderbajwa/src/types/pocketbase.d.ts

npx pocketbase-typegen --db %DB_PATH% --out %OUTPUT_FILE%