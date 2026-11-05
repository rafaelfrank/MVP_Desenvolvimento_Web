import os

import requests


URL_PLACES = "https://places.googleapis.com/v1/places:searchText"


def pesquisar_empresas(segmento, localizacao):
    """Pesquisa empresas por segmento e localização."""
    chave = os.getenv("GOOGLE_API_KEY")

    if not chave:
        raise ValueError("Defina a variável GOOGLE_API_KEY antes de executar.")

    resposta = requests.post(
        URL_PLACES,
        headers={
            "Content-Type": "application/json",
            "X-Goog-Api-Key": chave,
            "X-Goog-FieldMask": (
                "places.displayName,places.formattedAddress,"
                "places.nationalPhoneNumber,places.websiteUri"
            ),
        },
        json={
            "textQuery": f"{segmento} em {localizacao}",
            "maxResultCount": 20,
        },
        timeout=30,
    )

    if not resposta.ok:
        raise RuntimeError(
            f"Erro na API do Google ({resposta.status_code}): {resposta.text}"
        )

    return resposta.json().get("places", [])


def organizar_empresas(empresas):
    """Separa empresas que têm site das que não têm site."""
    com_site = []
    sem_site = []

    for empresa in empresas:
        nome = empresa.get("displayName", {}).get("text", "Sem nome")
        dados = {
            "nome": nome,
            "endereco": empresa.get("formattedAddress", "Não informado"),
            "contato": empresa.get("nationalPhoneNumber", "Não informado"),
            "site": empresa.get("websiteUri"),
        }

        if dados["site"]:
            com_site.append(dados)
        else:
            sem_site.append(dados)

    return com_site, sem_site


def mostrar_empresas(titulo, empresas):
    print(f"\n{titulo}: {len(empresas)}")

    for numero, empresa in enumerate(empresas, start=1):
        print(f"\n{numero}. {empresa['nome']}")
        print(f"   Endereço: {empresa['endereco']}")
        print(f"   Contato: {empresa['contato']}")
        print(f"   Site: {empresa['site'] or 'Não tem site cadastrado'}")
