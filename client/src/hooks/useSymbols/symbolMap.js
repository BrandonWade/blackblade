const symbolMap = {
    '{W}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/W.svg' alt='Symbol W' />",
    '{U}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/U.svg' alt='Symbol U' />",
    '{B}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/B.svg' alt='Symbol B' />",
    '{R}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/R.svg' alt='Symbol R' />",
    '{G}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/G.svg' alt='Symbol G' />",
    '{C}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/C.svg' alt='Symbol C' />",
    '{S}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/S.svg' alt='Symbol S' />",
    '{T}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/T.svg' alt='Symbol T' />",
    '{Q}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/Q.svg' alt='Symbol Q' />",
    '{E}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/E.svg' alt='Symbol E' />",
    '{PW}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/PW.svg' alt='Symbol PW' />",
    '{CHAOS}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/CHAOS.svg' alt='Symbol CHAOS' />",
    '{A}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/A.svg' alt='Symbol A' />",
    '{X}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/X.svg' alt='Symbol X' />",
    '{Y}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/Y.svg' alt='Symbol Y' />",
    '{Z}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/Z.svg' alt='Symbol Z' />",
    '{0}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/0.svg' alt='Symbol 0' />",
    '{½}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/HALF.svg' alt='Symbol HALF' />",
    '{1}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/1.svg' alt='Symbol 1' />",
    '{2}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/2.svg' alt='Symbol 2' />",
    '{3}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/3.svg' alt='Symbol 3' />",
    '{4}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/4.svg' alt='Symbol 4' />",
    '{5}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/5.svg' alt='Symbol 5' />",
    '{6}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/6.svg' alt='Symbol 6' />",
    '{7}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/7.svg' alt='Symbol 7' />",
    '{8}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/8.svg' alt='Symbol 8' />",
    '{9}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/9.svg' alt='Symbol 9' />",
    '{10}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/10.svg' alt='Symbol 10' />",
    '{11}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/11.svg' alt='Symbol 11' />",
    '{12}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/12.svg' alt='Symbol 12' />",
    '{13}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/13.svg' alt='Symbol 13' />",
    '{14}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/14.svg' alt='Symbol 14' />",
    '{15}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/15.svg' alt='Symbol 15' />",
    '{16}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/16.svg' alt='Symbol 16' />",
    '{17}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/17.svg' alt='Symbol 17' />",
    '{18}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/18.svg' alt='Symbol 18' />",
    '{19}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/19.svg' alt='Symbol 19' />",
    '{20}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/20.svg' alt='Symbol 20' />",
    '{100}': "<img class='CardSymbol CardSymbol--100' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/100.svg' alt='Symbol 100' />",
    '{1000000}':
        "<img class='CardSymbol CardSymbol--1000000' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/1000000.svg' alt='Symbol 1000000'/>",
    '{∞}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/INFINITY.svg' alt='Symbol INFINITY' />",
    '{W/U}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/WU.svg' alt='Symbol WU' />",
    '{W/B}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/WB.svg' alt='Symbol WB' />",
    '{B/R}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/BR.svg' alt='Symbol BR' />",
    '{B/G}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/BG.svg' alt='Symbol BG' />",
    '{U/B}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/UB.svg' alt='Symbol UB' />",
    '{U/R}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/UR.svg' alt='Symbol UR' />",
    '{R/G}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/RG.svg' alt='Symbol RG' />",
    '{R/W}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/RW.svg' alt='Symbol RW' />",
    '{G/W}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/GW.svg' alt='Symbol GW' />",
    '{G/U}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/GU.svg' alt='Symbol GU' />",
    '{2/W}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/2W.svg' alt='Symbol 2W' />",
    '{2/U}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/2U.svg' alt='Symbol 2U' />",
    '{2/B}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/2B.svg' alt='Symbol 2B' />",
    '{2/R}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/2R.svg' alt='Symbol 2R' />",
    '{2/G}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/2G.svg' alt='Symbol 2G' />",
    '{P}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/P.svg' alt='Symbol P' />",
    '{W/P}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/WP.svg' alt='Symbol WP' />",
    '{U/P}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/UP.svg' alt='Symbol UP' />",
    '{B/P}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/BP.svg' alt='Symbol BP' />",
    '{R/P}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/RP.svg' alt='Symbol RP' />",
    '{G/P}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/GP.svg' alt='Symbol GP' />",
    '{HW}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/HW.svg' alt='Symbol HW' />",
    '{HR}': "<img class='CardSymbol' src='https://c2.scryfall.com/file/scryfall-symbols/card-symbols/HR.svg' alt='Symbol HR' />",
};

export default symbolMap;
