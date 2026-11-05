from places import mostrar_empresas, organizar_empresas, pesquisar_empresas


def principal():
    segmento = input("Qual segmento você quer pesquisar? ")
    localizacao = input("Em qual cidade ou região? ")

    if not segmento or not localizacao:
        print("Informe o segmento e a localização.")
        return

    try:
        empresas = pesquisar_empresas(segmento, localizacao)
        com_site, sem_site = organizar_empresas(empresas)

        print(f"\nEncontrei {len(empresas)} empresa(s).")
        mostrar_empresas("Empresas com site", com_site)
        mostrar_empresas("Empresas sem site", sem_site)
    except (ValueError, RuntimeError) as erro:
        print(f"Erro: {erro}")


if __name__ == "__main__":
    principal()
