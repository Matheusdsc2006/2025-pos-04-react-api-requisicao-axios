export type TarefaInterface = {
	id: number;
	title: string;
	completed: boolean;
};

const dados: Array<TarefaInterface> = [
	{ 	id: 1, 
		title: "Alô Minora", 
		completed: true, 
	},
	{
		id: 2,
		title: "Diga ai Minora",
		completed: false,
	},
	{
		id: 3,
		title: "Suave Minora",
		completed: false,
	},
	{
		id: 4,
		title: "Coé Minora",
		completed: true,
	},
	{
		id: 5,
		title: "Fala Minora",
		completed: false,
	},
	{
		id: 6,
		title: "Eae Minora",
		completed: false,
	},
	{
		id: 7,
		title: "Olá Minora",
		completed: false,
	},
	{
		id: 8,
		title: "Oi Minora",
		completed: true,
	},
];

const carregar = (): Promise<TarefaInterface[]> => {
	return new Promise((resolve, reject) => {
		// const sucesso = Math.random() > 0.2; // 80% de chance de sucesso
		const sucesso = true;

		if (sucesso) {
			resolve(dados);
		} else {
			reject(new Error("Erro 500: Falha ao carregar dados da API"));
		}
	});
};

export {carregar};

export default dados;
