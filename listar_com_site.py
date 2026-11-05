from places import mostrar_empresas, organizar_empresas, pesquisar_empresas


def principal():
    segmento = input("Segmento: ")
    localizacao = input("Localização: ")

    try:
        empresas = pesquisar_empresas(segmento, localizacao)
        com_site, _ = organizar_empresas(empresas)
        mostrar_empresas("Empresas que têm site", com_site)
    except (ValueError, RuntimeError) as erro:
        print(f"Erro: {erro}")


if __name__ == "__main__":
    principal()
