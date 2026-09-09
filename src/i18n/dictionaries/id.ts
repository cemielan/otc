import type { Dictionary } from "./en";

export const id: Dictionary = {
  meta: {
    title:
      "Omicron Tuition Centre | Bimbel Cambridge & Nasional di Jakarta Barat",
    description:
      "Omicron Tuition Centre (OTC) membimbing siswa Checkpoint, IGCSE, AS/A Level, Nasional dan National+ untuk Matematika, Fisika, Kimia dan Bahasa Inggris — di Jakarta Barat.",
  },
  common: {
    language: "Bahasa",
    theme: "Tema",
    lightMode: "Mode terang",
    darkMode: "Mode gelap",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    backToTop: "Kembali ke atas",
    skipToContent: "Lompat ke konten",
  },
  nav: {
    programs: "Program",
    subjects: "Mata Pelajaran",
    about: "Tentang",
    packages: "Paket",
    location: "Lokasi",
    contact: "Kontak",
    cta: "Chat WhatsApp",
  },
  hero: {
    badge: "Cambridge · Nasional · National+",
    titleLead: "Fondasi yang kokoh untuk siswa",
    titleAccent: "Cambridge & Nasional",
    titleTail: "di Jakarta Barat.",
    description:
      "Omicron Tuition Centre mengajar Matematika, Fisika, Kimia dan Bahasa Inggris di Jakarta Barat — mulai Checkpoint dan IGCSE hingga AS/A Level, kurikulum nasional, serta persiapan TKA. Kelas tetap kecil agar setiap pertanyaan terjawab.",
    primaryCta: "Chat WhatsApp",
    secondaryCta: "Lihat paket kelas",
    note: "Hubungi kami untuk menanyakan jadwal dan ketersediaan sesuai jenjang.",
    stats: [
      { value: "4", label: "Mata pelajaran inti" },
      { value: "3", label: "Kurikulum yang dilayani" },
      { value: "3", label: "Format kelas" },
      { value: "1-10", label: "Siswa per kelas" },
    ],
    floatingCard: {
      title: "Checkpoint sampai A Level",
      body: "Satu tempat untuk seluruh perjalanan sekolah menengah.",
    },
  },
  programs: {
    eyebrow: "Program",
    title: "Diajarkan sesuai silabus yang dipakai sekolah Anda",
    description:
      "Setiap kurikulum dipetakan ke standar penilaiannya sendiri, sehingga materi di kelas sejalan dengan ujian yang akan dihadapi siswa.",
    levelsLabel: "Jenjang",
    items: {
      cambridge: {
        name: "Kurikulum Cambridge",
        tagline: "Jalur Cambridge lengkap, tahap demi tahap.",
        levels: [
          "Lower & Upper Secondary Checkpoint",
          "IGCSE",
          "AS Level",
          "A Level",
        ],
      },
      national: {
        name: "Kurikulum Nasional",
        tagline: "Silabus nasional Indonesia untuk SD, SMP dan SMA.",
        levels: ["SD", "SMP", "SMA"],
      },
      nationalPlus: {
        name: "National Plus",
        tagline: "Sekolah nasional bilingual, diajar dalam dua bahasa.",
        levels: ["SD", "SMP", "SMA"],
      },
      tka: {
        name: "Persiapan Tes Kemampuan Academik (TKA)",
        tagline: "Latihan terarah dan berbatas waktu menjelang TKA.",
        levels: ["Persiapan intensif"],
      },
    },
  },
  subjects: {
    eyebrow: "Mata Pelajaran",
    title: "Empat mata pelajaran, diajar pengajar yang memang ahlinya",
    description:
      "Kami sengaja membatasi daftar mata pelajaran agar setiap pengajar mengajar di bidangnya sendiri.",
    items: {
      mathematics: {
        name: "Matematika",
        description:
          "Dari kelancaran berhitung sampai kalkulus, statistika dan mekanika — dibahas langkah demi langkah sampai metodenya benar-benar dikuasai.",
        topics: ["Aljabar", "Geometri", "Kalkulus", "Statistika"],
      },
      physics: {
        name: "Fisika",
        description:
          "Mekanika, gelombang, kelistrikan dan fisika modern, lengkap dengan diagram dan penurunan rumus yang diharapkan penguji.",
        topics: ["Mekanika", "Gelombang", "Kelistrikan", "Fisika modern"],
      },
      chemistry: {
        name: "Kimia",
        description:
          "Stoikiometri, jalur reaksi organik dan kimia fisik, dipadukan dengan penalaran laboratorium dan teknik menjawab ujian.",
        topics: ["Stoikiometri", "Organik", "Kimia fisik", "Anorganik"],
      },
      english: {
        name: "Bahasa Inggris",
        description:
          "Pemahaman bacaan, menulis terstruktur, tata bahasa, dan keberanian berbicara di kelas berbahasa Inggris.",
        topics: ["Membaca", "Menulis", "Tata bahasa", "Berbicara"],
      },
    },
  },
  about: {
    eyebrow: "Misi & visi",
    title: "Paham dulu. Nilai mengikuti.",
    description:
      "Omicron hadir karena terlalu banyak siswa dilatih menghafal jawaban, bukan bernalar. Kami bekerja dengan cara sebaliknya.",
    vision: {
      label: "Visi kami",
      body: "Menjadi mitra belajar paling dipercaya di Jakarta Barat — tempat siswa dari kurikulum apa pun membangun pemahaman yang sungguh-sungguh, kepercayaan diri, dan kebiasaan belajar yang bertahan setelah musim ujian berakhir.",
    },
    mission: {
      label: "Misi kami",
      items: [
        {
          title: "Mengajar dari konsep dasar",
          body: "Setiap topik diurai dan dibangun ulang sebelum kami melatih satu pun soal ujian tahun lalu.",
        },
        {
          title: "Menjaga kelas tetap kecil",
          body: "Format normal, semi-privat dan privat, agar perhatian menyesuaikan cara belajar tiap siswa.",
        },
        {
          title: "Menghormati setiap kurikulum",
          body: "Silabus Cambridge, Nasional dan National+ diajarkan sesuai standarnya masing-masing, tidak dicampur jadi satu.",
        },
        {
          title: "Melaporkan kemajuan dengan jujur",
          body: "Umpan balik yang jelas untuk siswa dan orang tua, tanpa janji yang dibesar-besarkan.",
        },
      ],
    },
    values: [
      "Pemahaman di atas hafalan",
      "Kelas kecil",
      "Umpan balik jujur",
      "Teknik siap ujian",
    ],
  },
  packages: {
    eyebrow: "Paket",
    title: "Tiga format kelas. Satu standar pengajaran.",
    description:
      "Semua format mengikuti pemetaan silabus dan pengajar yang sama — yang berbeda hanyalah seberapa besar perhatian yang jadi milik Anda.",
    perMonth: "/ bulan",
    perSubject: "per mata pelajaran",
    popular: "Paling banyak dipilih",
    capacityLabel: "Ukuran kelas",
    studentsUnit: "siswa",
    consultPrice: "Konsultasi dengan kami",
    consultNote: "Harga disesuaikan dengan jadwal dan jumlah mata pelajaran.",
    consultCta: "Konsultasi via WhatsApp",
    selectCta: "Tanya kelas ini",
    includesLabel: "Yang Anda dapatkan",
    footnote:
      "Harga di atas berlaku per mata pelajaran per bulan. Hubungi kami untuk jadwal dan ketersediaan terkini sesuai jenjang dan kurikulum.",
    plans: {
      normal: {
        name: "Kelas Normal",
        tagline: "Belajar berkelompok yang menjaga ritme.",
        features: [
          "6-10 siswa per kelas",
          "8 sesi per bulan, masing-masing 90 menit",
          "Modul dan lembar kerja sesuai kurikulum",
          "Ringkasan kemajuan bulanan",
        ],
      },
      semiPrivate: {
        name: "Kelas Semi-Privat",
        tagline: "Jalan tengah yang paling banyak dipilih siswa.",
        features: [
          "2-4 siswa per kelas",
          "8 sesi per bulan, masing-masing 90 menit",
          "Tempo menyesuaikan topik yang masih lemah",
          "Klinik soal ujian sebelum masa ujian",
          "Akses langsung ke pengajar antar sesi",
        ],
      },
      private: {
        name: "Kelas Privat",
        tagline: "Satu lawan satu, dirancang sepenuhnya untuk satu siswa.",
        features: [
          "Satu siswa, satu pengajar",
          "Jadwal dan durasi sesi ditentukan bersama Anda",
          "Rencana belajar yang sepenuhnya personal",
          "Slot prioritas pada musim ujian",
          "Pendampingan intensif untuk mengejar atau mempercepat materi",
        ],
      },
    },
  },
  steps: {
    eyebrow: "Cara bergabung",
    title: "Tiga langkah dari pesan pertama sampai kelas pertama",
    items: [
      {
        title: "Hubungi kami",
        body: "Kirim jenjang siswa, kurikulumnya, dan mata pelajaran yang perlu dibantu.",
      },
      {
        title: "Diskusi singkat",
        body: "Kami bahas kemampuan saat ini, targetnya, dan format kelas yang paling cocok.",
      },
      {
        title: "Mulai belajar",
        body: "Jadwal dikonfirmasi, lalu belajar dimulai dengan pengajar mata pelajaran tersebut.",
      },
    ],
  },
  location: {
    eyebrow: "Lokasi",
    title: "Temukan kami di Jakarta Barat",
    description:
      "Omicron Tuition Centre berbasis di Jakarta Barat dan mengajar langsung di tempat.",
    addressLabel: "Lokasi kami",
    addressNote:
      "Alamat lengkap dan petunjuk arah kami kirimkan melalui WhatsApp setelah jadwal Anda dikonfirmasi.",
    directionsCta: "Buka di Google Maps",
    contactCta: "Tanya petunjuk arah",
    mapTitle:
      "Peta yang menunjukkan area Omicron Tuition Centre di Jakarta Barat",
    detailsLabel: "Perlu diketahui",
    details: [
      "Kelas berlangsung di tempat (on-site)",
      "Format normal, semi-privat dan privat",
      "Tanyakan slot waktu yang tersedia",
    ],
  },
  contact: {
    eyebrow: "Kontak",
    title: "Ceritakan kebutuhan belajar siswa Anda",
    description:
      "Isi formulir ini dan WhatsApp akan terbuka dengan pesan yang siap dikirim — tidak ada data yang disimpan di situs ini.",
    form: {
      nameLabel: "Nama siswa atau orang tua",
      namePlaceholder: "mis. Andrew",
      gradeLabel: "Jenjang & kurikulum",
      gradePlaceholder: "mis. Year 11 IGCSE",
      subjectLabel: "Mata pelajaran",
      subjectPlaceholder: "Pilih mata pelajaran",
      subjectAll: "Beberapa mata pelajaran",
      planLabel: "Kelas yang diminati",
      planPlaceholder: "Pilih format kelas",
      planUndecided: "Belum yakin",
      messageLabel: "Ada hal lain?",
      messagePlaceholder: "Topik yang ingin difokuskan, hari yang cocok, tanggal ujian…",
      submit: "Kirim via WhatsApp",
      privacy:
        "Membuka WhatsApp di tab baru. Formulir ini tidak mengirim data apa pun ke server kami.",
      required: "Mohon isi kolom nama terlebih dahulu.",
      template: {
        intro:
          "Halo Omicron Tuition Centre, saya ingin menanyakan tentang bimbingan belajar.",
        name: "Nama",
        grade: "Jenjang & kurikulum",
        subject: "Mata pelajaran",
        plan: "Kelas yang diminati",
        message: "Catatan",
      },
    },
    channels: {
      whatsappLabel: "WhatsApp",
      whatsappValue: "Cara tercepat menghubungi kami",
      instagramLabel: "Instagram",
      instagramValue: "Kabar terbaru dan kegiatan kelas",
      phoneLabel: "Telepon",
      phoneValue: "Nomor kantor",
    },
  },
  cta: {
    title: "Siap merasakan bedanya belajar di kelas kecil?",
    description:
      "Kirim pesan kepada kami dan kami bantu memilih format serta jadwal yang paling sesuai untuk siswa Anda.",
    primary: "Chat WhatsApp",
    secondary: "Bandingkan paket",
  },
  footer: {
    tagline:
      "Bimbingan belajar Cambridge, Nasional dan National+ di Jakarta Barat. Matematika, Fisika, Kimia dan Bahasa Inggris.",
    exploreLabel: "Jelajahi",
    subjectsLabel: "Mata Pelajaran",
    reachLabel: "Hubungi kami",
    rights: "Seluruh hak cipta dilindungi.",
  },
};
