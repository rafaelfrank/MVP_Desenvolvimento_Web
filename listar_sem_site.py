from places import mostrar_empresas, organizar_empresas, pesquisar_empresas


def principal():
    segmento = input("Segmento: ")
    localizacao = input("Localização: ")

    try:
        empresas = pesquisar_empresas(segmento, localizacao)
        _, sem_site = organizar_empresas(empresas)
        mostrar_empresas("Empresas que não têm site", sem_site)
    except (ValueError, RuntimeError) as erro:
        print(f"Erro: {erro}")


if __name__ == "__main__":
    principal()
