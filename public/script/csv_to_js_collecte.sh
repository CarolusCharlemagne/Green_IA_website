#!/bin/bash

input_file="../data/collecte/collecte_dechets_finalS.csv"
output_file="../../functions/collecte.txt"

echo "const donneesCollecte = [" > "$output_file"

tail -n +2 "$input_file" | while IFS=, read -r code_postal commune ordure tri
do
    ordure=${ordure/" et "/" et "}
    tri=$(echo "$tri" | tr -d '\r' | tr -d '\n')
    echo "    {" >> "$output_file"
    echo "        nom_ville: \"$commune\"," >> "$output_file"
    echo "        code_postal: $code_postal," >> "$output_file"
    echo "        service_ordures_menageres: \"$ordure\"," >> "$output_file"
    echo "        service_tri_selectif: \"$tri\"" >> "$output_file"
    echo "    }," >> "$output_file"
done

sed -i '$ s/,$//' "$output_file"

echo "];" >> "$output_file"

echo "Les données ont été écrites dans $output_file"
