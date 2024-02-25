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

# script pour mettre a jour les données du fichier js
JS_FILE="../../functions/collecte.js"
TXT_FILE=$output_file
TMP_FILE=$(mktemp)

sed '/\/\/ DEBUT/,/\/\/ FIN/{//!d}' "$JS_FILE" > "$TMP_FILE"

awk '/\/\/ DEBUT/{print;print "content_to_insert";next}1' "$TMP_FILE" > "$JS_FILE" && sed -i "/content_to_insert/r $TXT_FILE" "$JS_FILE" && sed -i '/content_to_insert/d' "$JS_FILE"

rm "$TMP_FILE"

echo "Modification effectuée avec succès."

# supprimer le fichier texte généré
rm -fv $output_file