export default {
    semId: {
        descricao: 'Conta de luz',
        valor: 189.9,
        vencimento: new Date('2026-04-10T00:00:00.000Z')
    },
    valorNegativo: {
        descricao: 'Conta de agua',
        valor: -50,
        vencimento: new Date('2026-04-10T00:00:00.000Z')
    },
    vencimentoInvalido: {
        descricao: 'Internet',
        valor: 120,
        vencimento: new Date('data-invalida')
    },
    descricaoVazia: {
        descricao: '',
        valor: 75,
        vencimento: new Date('2026-04-10T00:00:00.000Z')
    }
}