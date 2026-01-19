// Fallback data for StatisticsSection component
import LandscapeIcon from "@/components/icons/LandscapeIcon";
import TreeSpeciesIcon from "@/components/icons/TreeSpeciesIcon";
import EndangeredSpeciesIcon from "@/components/icons/EndangeredSpeciesIcon";
import Co2OffsetIcon from "@/components/icons/Co2OffsetIcon";
import StatesProjectsIcon from "@/components/icons/StatesProjectsIcon";
import LakesRestoredIcon from "@/components/icons/LakesRestoredIcon";

export const FALLBACK_TOP_ROW_STATS = [
    {
        icon: <LandscapeIcon width={40} height={40} color="#206f32" />,
        mobileIcon: <LandscapeIcon width={32} height={32} color="#206f32" />,
        number: "10,000+",
        label: "Acres Afforested",
    },
    {
        icon: <TreeSpeciesIcon width={36} height={36} color="#206f32" />,
        mobileIcon: <TreeSpeciesIcon width={28} height={28} color="#206f32" />,
        number: "330+",
        label: "Native Tree Species Planted",
    },
    {
        icon: <EndangeredSpeciesIcon width={36} height={36} color="#206f32" />,
        mobileIcon: (
            <EndangeredSpeciesIcon width={28} height={28} color="#206f32" />
        ),
        number: "80+",
        label: "Endangered Species Curated",
    },
];

export const FALLBACK_BOTTOM_ROW_STATS = [
    {
        icon: <Co2OffsetIcon width={40} height={40} color="#206f32" />,
        mobileIcon: <Co2OffsetIcon width={32} height={32} color="#206f32" />,
        number: "64,000+",
        label: (
            <>
                Tons of CO<sub>2</sub> Offset
            </>
        ),
    },
    {
        icon: <StatesProjectsIcon width={36} height={40} color="#206f32" />,
        mobileIcon: <StatesProjectsIcon width={28} height={32} color="#206f32" />,
        number: "12+",
        label: "States with Implemented Projects",
    },
    {
        icon: <LakesRestoredIcon width={40} height={40} color="#206f32" />,
        mobileIcon: <LakesRestoredIcon width={32} height={32} color="#206f32" />,
        number: "35+",
        label: "Lakes Created and Restored",
    },
];
