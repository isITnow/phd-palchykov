const publicationsArray = [
  {
    period: "2021-present",
    publicationsList: [
      {
        id: 61,
        title:
          "She always worked with inspiration and was able to inspire others",
        authors: [
          "V.S. Kovalenko",
          "V.A. Palchykov",
          "S.I. Okovytyy",
          "N.V. Stets",
        ],
        source: "J. Chem. Technol. 2022, 30(4), 490-501",
        url: "https://doi.org/10.15421/jchemtech.v30i4.265515",
        cover_img: "jchemtech2022_(30)4_cover.jpg",
        abstract_img: "jchemtech2022_(30)4_abstract.jpg",
      },
      {
        id: 60,
        title:
          "Synthesis of novel cage amides and imides and evaluation of their antibacterial and antigungal activities",
        authors: [
          "V. Palchykov",
          "A. Gaponov",
          "N. Manko",
          "N. Finiuk",
          "O. Novikevych",
          "O. Gromyko",
          "R. Stoika",
          "N. Pokhodylo",
        ],
        source: "Ukr. Biochem. J. 2022, 94(3), 68-80",
        url: "https://doi.org/10.15407/ubj94.03.068",
        cover_img: "UkrBiochemJ_2022_cover.jpg",
        abstract_img: "UkrBiochemJ_2022_94(3)_abstract.jpg",
      },
      {
        id: 59,
        title:
          "2-Amino-4,6,7,8-tetrahydrothiopyrano[3,2-b]pyran-3-carbonitrile 5,5-dioxide VP-4535 as an antimicrobial agent selective toward methicillin-resistant Staphylococcus aureus",
        authors: ["V. Palchykov", "N. Manko", "N. Finiuk", "N. Pokhodylo"],
        source: "Ukr. Biochem. J. 2022, 94(1), 64-74",
        url: "https://doi.org/10.15407/ubj94.01.064",
        cover_img: "UkrBiochemJ_2022_cover.jpg",
        abstract_img: "UkrBiochemJ_2022_94(1)_abstract.jpg",
      },
      {
        id: 58,
        title:
          "Recent Advances in Visible Light-Induced C(sp3)–N Bond Formation",
        authors: ["M. Rivas", "V. Palchykov", "X. Jia", "V. Gevorgyan"],
        source: "Nature Rev. Chem. 2022, 6, 544-561",
        url: "https://doi.org/10.1038/s41570-022-00403-8",
        cover_img: "NatureRevChem_2022_cover.jpg",
        abstract_img: "NatureRevChem_2022_abstract.jpg",
      },
      {
        id: 57,
        title: "Cage arylsulfonamides and their antimicrobial properties",
        authors: [
          "V. Palchykov",
          "K. Dil",
          "N. Manko",
          "N. Finiuk",
          "О. Novikevych",
          "N. Pokhodylo",
        ],
        source: "J. Chem. Technol. 2022, 30(1), 1-10",
        url: "https://doi.org/10.15421/jchemtech.v30i1.246451",
        cover_img: "jchemtech2022_(30)1_cover.jpg",
        abstract_img: "jchemtech2022_(30)1_abstract.jpg",
      },
      {
        id: 56,
        title:
          "Antimicrobial evaluation of arylsulfonamides bearing (aza)norbornane and related motifs",
        authors: [
          "V. Palchykov",
          "N. Manko",
          "N. Finiuk",
          "R. Stoika",
          "N. Pokhodylo",
          "M. Obushak",
        ],
        source: "Med. Chem. Res. 2022, 31(2), 284-292",
        url: "https://doi.org/10.1007/s00044-021-02827-1",
        cover_img: "MedChemRes2022_cover.jpg",
        abstract_img: "MedChemRes2022_abstract.jpg",
      },
      {
        id: 55,
        title:
          "Nucleophilic Vinylic Substitution in Bicyclic Methylene Aziridines: SNVπ or SNVσ?",
        authors: ["V. Palchykov", "P.C. Dale", "J. Robertson"],
        source: "New J. Chem. 2021, 45(20), 9020-9025",
        url: "https://doi.org/10.1039/D1NJ01458G",
        cover_img: "NewJChem2021_cover.jpg",
        abstract_img: "NewJChem2021_abstract.jpg",
      },
      {
        id: 54,
        title:
          "Targeting a Cryptic Pocket in a Protein-Protein Contact by Disulfide-Induced Rupture of a Homodimeric Interface",
        authors: [
          "D. Nguyen",
          "X. Xie",
          "S. Jakobi",
          "F. Terwesten",
          "A. Metz",
          "P. Nguyen",
          "V. Palchykov",
          "A. Heine",
          "K. Reuter",
          "G. Klebe",
        ],
        source: "ACS Chem. Biol. 2021, 16(6), 1090-1098",
        url: "https://doi.org/10.1021/acschembio.1c00296",
        cover_img: "ACSChemBiol2021_cover.jpg",
        abstract_img: "ACSChemBiol2021_abstract.jpg",
      },
      {
        id: 53,
        title:
          "Visible Light-Induced Pd-Catalyzed Alkyl-Heck Reaction of Oximes",
        authors: [
          "N. Kvasovs",
          "V. Iziumchenko",
          "V. Palchykov",
          "V. Gevorgyan",
        ],
        source: "ACS Catal. 2021, 11(6), 3749-3754",
        url: "https://doi.org/10.1021/acscatal.1c00267",
        cover_img: "ACSCatal2021_cover.jpg",
        abstract_img: "ACSCatal2021_abstract.jpg",
      },
      {
        id: 52,
        title:
          "Stereoselective organocatalytic construction of spiro oxindole pyrrolidines using unsaturated α-ketoesters and α-ketoamides",
        authors: [
          "T. Peňaška",
          "V. Palchykov",
          "E. Rakovský",
          "G. Addová",
          "R. Šebesta",
        ],
        source: "Eur. J. Org. Chem. 2021, (11), 1693-1703",
        url: "https://doi.org/10.1002/ejoc.202100022",
        cover_img: "EurJOrgChem2021_cover.jpg",
        abstract_img: "EurJOrgChem2021_abstract.jpg",
      },
    ],
  },
];

export default publicationsArray;
