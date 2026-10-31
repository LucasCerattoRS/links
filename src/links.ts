// Fonte única do conteúdo. Para adicionar um link: uma linha aqui, `npm run build`, commit.
export const pix = { chave: '+5554996993241', rotulo: 'Telefone' };

export type Item = { href: string; title: string; sub: string; primary?: boolean };
export type Section = { title: string; className?: string; items: Item[] };

const gh = (repo: string) => `https://github.com/LucasCerattoRS/${repo}`;

export const sections: Section[] = [
  { title: 'Contato', className: 'contact', items: [
    { href: 'https://wa.me/5554996993241', title: 'WhatsApp', sub: 'Chame direto, respondo por lá', primary: true },
    { href: 'https://www.linkedin.com/in/lucas-ceratto-dagnese-b404b439a/', title: 'LinkedIn', sub: 'Trajetória e contato profissional' },
    { href: 'https://github.com/LucasCerattoRS', title: 'GitHub', sub: 'Todo o código, aberto' },
    { href: 'https://medium.com/@lukelucanolightknowledge', title: 'Medium', sub: 'Artigos que escrevi' },
  ] },
  { title: 'Ferramentas', items: [
    { href: gh('video-downloader'), title: 'Video Downloader', sub: 'Cole o link, baixe. Roda no seu computador' },
    { href: gh('TranscritorNPU'), title: 'Transcritor', sub: 'Áudio e vídeo viram texto, offline' },
  ] },
  { title: 'Projetos', items: [
    { href: gh('the-farmer-was-replaced-lab'), title: 'TFWR Lab', sub: 'Aprendendo programação com o jogo' },
    { href: gh('horizonte-estudos'), title: 'Horizonte', sub: 'Banco de questões e material de estudo' },
    { href: gh('ai-coop'), title: 'AI Coop', sub: 'Agentes de IA dividindo o mesmo repositório' },
    { href: gh('finan'), title: 'Finan', sub: 'Finanças pessoais, dados só com você' },
  ] },
];
