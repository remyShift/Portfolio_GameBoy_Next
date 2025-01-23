import TimelineItems from './TimelineItems';
import Spacer from "../Spacer";
import Light_Btn from "../../../Global_Template/G-Bottom/Buttons/Light_Btn";
import Lights from "../../../Global_Template/G-Bottom/Buttons/Lights";
import SelectSpeakers_Btn from "../../../Global_Template/G-Bottom/Buttons/SelectSpeakers_Btn";
import Divider from "../Projects/Divider";

const timelineData = [
	{
		title: "Commercial chez Maximo",
		date: "09 / 2020",
		description: "Gestion d'un portfeuille client et prospection pour de la vente de produit surgelés et d'épicerie à domicile.",
	},
	{
		title: "Piscine école 42",
		date: "09 / 2022",
		description: "Résolution de problème algorithmique en C et travail en équipe durant 4 semaines intensives.",
	},
	{
		title: "2nde Piscine de l'école 42",
		date: "08 / 2023",
		description: "Résolution de problème algorithmique en C et travail en équipe durant 4 semaines intensives.",
	},
	{
		title: "Formation - Ada Tech School",
		date: "10 / 2023 - 02 / 2024",
		description: "Formation en développement fullstack avec une approche pédagogique axée sur les projets et la pratique. Pour voir les projets réalisés, rendez-vous sur la page Projets.",
	},
	{
		title: "Formation - Le Wagon",
		date: "10 / 2024 - 12 / 2024",
		description: "Le bootcamp web du Wagon est une formation immersive en développement web, axée sur la création et le déploiement d'applications web modernes, dans un cadre intensif et collaboratif.",
	},
	{
		title: "Stage - Spash",
		date: "01 / 2025 - 02 / 2025",
		description: "Développement d'un outil de debugging pour le développement d'une IA afin de faciliter la visualisation des données renvoyées par cette dernière.",
	}
];

export default function AboutTimeline() {
	return (
		<div className="w-full h-full flex flex-row  pt-4">
			<Spacer />
			<div className="w-full flex flex-col justify-center items-center">
				<Light_Btn />
				<ol className="h-[85%] w-[85%] md:w-auto pt-40 border-l-2 border-wine mx-auto mb-10">
					{timelineData.map((item, index) => (
						<TimelineItems key={index} {...item} />
					))}
				</ol>
				<Divider onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
					⬆︎
				</Divider>
				<SelectSpeakers_Btn />
			</div>
			<Lights />
		</div>
	);
}