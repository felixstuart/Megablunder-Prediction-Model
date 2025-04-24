import requests

root_url = "https://mymustangs.milton.edu/grammar/answerPrint.cfm?LQID="

# 92-95
# 115-118
# 55 & 56
# 62 & 63
# 71 & 72

# take the ids and append them to the root_url
ids = [92, 93, 94, 115, 116, 117, 118, 55, 56, 62, 63, 71, 72]

for id in ids:
    url = root_url + str(id)
    # get the pdf and save it to the current directory
    response = requests.get(url)
    with open(f"{id}.pdf", "wb") as f:
        # all of these pdfs are not my property and I do not own the rights to them
        f.write(response.content)
