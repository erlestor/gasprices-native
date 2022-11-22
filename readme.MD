# Prosjekt 4

## Hvordan kjøre appen

### Frontend

- åpne terminal i root
- "expo install"
- "npm start"
- Følg instrukser for å kjøre appen med emulator, egen mobil, eller nettleser

### Backend

- bruker samme backend som i forrige prosjekt, kobler direkte til vm
- sørg for at du er på ntnu sitt nett med den enheten du tester

## Innhold og funksjonalitet

Applikasjonen beholder samme funksjonalitet som i prosjekt 3. Dette innebærer å vise brukeren drivstoffpriser på mange ulike bensinstasjoner. Hensikten er at brukeren skal kunne registerere drivstoffpriser de observerer og gi andre brukere muligheten til å ha oversikt over disse. Hjemmeskjermen viser en liste over priser på forskjellige bensinstasjoner. Det er mulig å filterere på ulike byer med radioknapper og maks pris med en slider. Man kan også tømme filtereringen for å se alle stasjoner. Søkefelter over stasjonene gir mulighet til å søke på en bensinstasjon etter navn. Brukeren kan også sortere rekkefølgen på listen enten etter pris eller navn.

## Teknologi

For enkelhets skyld har jeg beholdt så mye funksjonalitet som mulig fra prosjekt 3. Dette innebærer bruken av typescript for type checking. Apollo for fetching av data og local state managment. Backend er ikke rørt og apollo kobles direkte opp mot backenden som kjører på [vm](http://it2810-41.idi.ntnu.no:4000/project3/graphql). Hoveddelen av prosjektet er at jeg har gjort om prosjektet til react-native med expo. Expo gjør det lett å utvikle og bygge react-native prosjekter på bekostning av fleksibilitet og evne til å konfigurere visse aspekter ved applikasjonen. Dette har fungert utmerket i mitt tilfelle da jeg trengte noe som kunne lages og kjøres raskt. Viss et tilfelle hadde oppstått der jeg trengte mer fleksibilitet har man alltid muligheten til å "ejecte" appen til et rent react-native prosjekt.

## Bærekraftig utvikling

Her har jeg beholdt de samme tiltakene for bærekraftighet som i prosjekt 4. Søket på bensinstasjonnavn bruker debounce, altså venter applikasjonen litt før den faktisk henter inn ny data basert på søk. Dette unngår mange unødvendige kall mens bruker fortsatt skriver ferdig. Debouncing brukes også på samme måte på makspris slideren. Mindre kall til database, betyr mindre netttrafikk og derav mindre energiforbruk. Noe vi nevnte i forrige prosjekt var å bruke darkmode for å spare strømbruken til skjermen, men dette var nedprioritert da overgangen til react-native tok lengre tid enn forventet.

## Fornuftige valg

### Komponenter

Jeg har valgt å bruke react-native-paper for de fleste komponenter ettersom dette er første gangen jeg bruker react-native. Dette går på bekostning av tilpassing av komponenter og frihet når det gjelder valg av utseende, samt ekstra filstørrelse på build. Årsaken er at react-native-paper gjør mye bra innen universell utforming og generelt gir et bra utseende på kort tid. Dette brukes på all tekst, knapper, kort og input felter. Unntak er sorteringen som bruker @react-native-picker/picker. Dette var anbefalt av react-native da den innebygde "Picker" er depricated.

### Design

For det meste har jeg forsøkt å implementere det samme designet som var brukt i prosjekt 3. Der fikk vi en del tilbakemeldinger på kontrast mellom sidebar og hovedside og synligheten til kortene til hver bensinstasjon. Løsningen har vært å bruke "elevation" på android for å øke skyggen slik at elementene er mer distinkte. Tekst og knapper er generelt litt større og lettere å trykke på enn før.

## Opplevelser med react-native

Overgangen til react-native var mer tidskrevende enn først anntatt. Alle HTML elementer måtte endres til react native komponenter. F.eks. `<div>` til `<View>` osv. I tillegg måtte alle komponent-biblioteker som ble brukt endres til et bibliotek som fungerer i react-native. Et eksempel er å bruke den innebygde FlatList fremfor InfiniteScroll. Dette ga problemer da FlatList lastet inn mer og mer data istedenfor å vente til brukeren scrollet nedert på listen. Dette har sikkert en enkel fiks, men ikke noe jeg klarte på den tiden vi hadde.

En stor lærdom til neste gang er å utvikle med android emulator fra starten av. Mesteparten av prosjektet har jeg brukt nettleser til å teste appen siden emulatoren krasjet ved oppstart av appen. Istendenfor å løse dette med en gang, antok jeg at det var et problem med selve emulatoren. Jeg oppdaget senere at dette b.la. var fordi jeg brukte `margin: "10px"` istendefor `margin: 10` flere steder i StyleSheet. Det var også en rekke andre problemer der jeg brukte styling som fungerte i nettleser, men ikke på mobil. Disse feilene kunne blitt fanget opp med en gang hvis jeg hadde brukt emulator hele veien.

## Forbedringspunkter

- designet på pc er ikke perfekt. For listen med stasjoner, burde jeg ha brukt flere kolonner på pc, slik som i forrige prosjekt. Dette ville brukt skjermplassen mer effektivt. I tillegg strekker ikke bakgrunnen seg helt ned på siden. Dette har jeg snevret ned til å være et problem med FlatList. Dette er likevel ikke store problemer da fokuset var å kjøre appen på android.
- som nevnt tidligere fungerer ikke infinite scroll. Dette gjør at man ikke kan bla ned for å se flere elementer. Løsningen er å fikse problemet med FlatList eller legge til en knapp for å se flere. Med bærekraft i tankene har jeg skrudd av funksjonen slik at appen ikke henter alle 400+ stasjoner hver render.
- i addPrice kan man ikke skrive inn desimaltall. react-native-paper har ingen egen input felt for tall. Derav har jeg brukt regex for å se bort fra alle verdier som ikke er heltall eller desimaltall. Tydeligvis er det noe problemer med regex'n. Dette går utover funksjonaliteten i appen og har høy prioritet.
- Applikasjonen er testet i android og nettleser. I utgangspunktet skal react-native sørge for at appen kjører på alle enheter, men for å sørge for at brukeropplevelsen er like god overalt burde flere enheter vært brukt
