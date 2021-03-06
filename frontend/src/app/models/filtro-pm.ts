import { Classe } from './classe';
import { Natureza } from './natureza';
import { Tribunal } from './tribunal';
import { OrgaoJulgador } from './orgao-julgador';
import { TipoJustica } from './tipo-justica';
import { LocalDataSource } from 'ng2-smart-table';
import { AtuacaoOrgaoJulgador } from './atuacao-orgaojulgador';
import { Cluster } from './cluster';

export enum MetricaPm {
    Frequency = "FREQUENCY",
    Performance = "PERFORMANCE"
}

export enum ImageFormatPm {
    SVG = "svg",
    PNG = "png"
}

export class FiltroPm {

    public url: string = '';
    public urlEstatistica: string = '';
    public urlOrgaosJulgadoresModelFit: string = '';
    public loaded: boolean = false;
    public maximized: boolean = false;
    public metrica: MetricaPm = MetricaPm.Frequency;
    public formato: ImageFormatPm = ImageFormatPm.SVG;
    public svgContent: any;
    public svgObject: any;
    public dadosTabelaEstatistica : LocalDataSource = new LocalDataSource();
    public dadosTabelaOrgaosJulgadoresModelFit : LocalDataSource = new LocalDataSource();
    public dadosGrafico: any;

    constructor(
        public tipoJustica: TipoJustica, 
        public tribunal: Tribunal, public orgaoJulgador: OrgaoJulgador, public atuacaoOrgaoJulgador: AtuacaoOrgaoJulgador,
        public natureza: Natureza, public classe: Classe, public cluster: Cluster, public baixado: boolean = true,
        public sensibilidade: number = 10
    ) {
        this.updateUrl();
    }

    updateUrl() {
        this.url = FiltroPm.buildUrlModeloPm(this);
        this.urlEstatistica = FiltroPm.buildUrlEstatisticaModeloPm(this);
        this.urlOrgaosJulgadoresModelFit = FiltroPm.buildUrlOrgaoJulgadoresModelFit(this);
    }

    /**
     * Retorna um Modelo
     */
    public static buildUrlModeloPm(filtro: FiltroPm, prefixApi: string = '/api'): string {
        const urlPm = prefixApi + 
            `/v1/gerar-modelo-pm?${filtro.tipoJustica != null ? '&ramojustica=' + filtro.tipoJustica.codigo : ''}${filtro.tribunal != null ? '&codtribunal=' + filtro.tribunal.codigo : ''}${filtro.atuacaoOrgaoJulgador != null ? '&atuacao=' + filtro.atuacaoOrgaoJulgador.codigo : ''}${filtro.cluster != null ? '&cluster=' + filtro.cluster.codigo : ''}${filtro.orgaoJulgador != null ? '&codorgaoj=' + filtro.orgaoJulgador.codigo : ''}${filtro.natureza != null ? '&natureza=' + filtro.natureza.codigo : ''}${filtro.classe != null ? '&codclasse=' + filtro.classe.codigo : ''}${filtro.baixado != null && filtro.baixado ? '&baixado=S' : ''}${filtro.sensibilidade != null ? '&sensibilidade=' + filtro.sensibilidade : '60'}${filtro.metrica != null ? '&metrica=' + filtro.metrica : MetricaPm.Frequency}${filtro.metrica != null ? '&formato=' + filtro.formato : ImageFormatPm.SVG}`;
        console.log(urlPm)
        return urlPm;
    }

    public static buildUrlEstatisticaModeloPm(filtro: FiltroPm, prefixApi: string = '/api'): string {
        const urlPm = prefixApi + 
            `/v1/gerar-estatisticas-modelo-pm?${filtro.tipoJustica != null ? '&ramojustica=' + filtro.tipoJustica.codigo : ''}${filtro.tribunal != null ? '&codtribunal=' + filtro.tribunal.codigo : ''}${filtro.atuacaoOrgaoJulgador != null ? '&atuacao=' + filtro.atuacaoOrgaoJulgador.codigo : ''}${filtro.cluster != null ? '&cluster=' + filtro.cluster.codigo : ''}${filtro.orgaoJulgador != null ? '&codorgaoj=' + filtro.orgaoJulgador.codigo : ''}${filtro.natureza != null ? '&natureza=' + filtro.natureza.codigo : ''}${filtro.classe != null ? '&codclasse=' + filtro.classe.codigo : ''}${filtro.baixado != null && filtro.baixado ? '&baixado=S' : ''}${filtro.sensibilidade != null ? '&sensibilidade=' + filtro.sensibilidade : '60'}`;
        console.log(urlPm)
        return urlPm;
    }

    public static buildUrlOrgaoJulgadoresModelFit(filtro: FiltroPm, prefixApi: string = '/api'): string {
        const urlPm = prefixApi + 
            `/v1/gerar-orgaosjulgadores-modelfit?${filtro.tipoJustica != null ? '&ramojustica=' + filtro.tipoJustica.codigo : ''}${filtro.tribunal != null ? '&codtribunal=' + filtro.tribunal.codigo : ''}${filtro.atuacaoOrgaoJulgador != null ? '&atuacao=' + filtro.atuacaoOrgaoJulgador.codigo : ''}${filtro.cluster != null ? '&cluster=' + filtro.cluster.codigo : ''}${filtro.orgaoJulgador != null ? '&codorgaoj=' + filtro.orgaoJulgador.codigo : ''}${filtro.natureza != null ? '&natureza=' + filtro.natureza.codigo : ''}`;
        console.log(urlPm)
        return urlPm;
    }
}
