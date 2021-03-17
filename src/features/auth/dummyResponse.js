const dummyResponse = {
  success: true,
  result: {
    token: 'dummy.thisisaverylongdummytoken',
  },
  instructions: {
    updateCreds: {
      creds: {
        token: 'dummy.thisisaverylongdummytoken',
      },
    },
    updateMessages: {
      messages: [
        {
          id: 366193643338062,
          subject: '(04-00-0128-vu/Mathe I Inf) wichtige Änderungen!',
          body:
            'Liebe Studierende,\r\n\r\nbevor es nächste Woche mit den Übungen losgeht, möchten wir Sie über zwei Änderungen informieren:\r\n\r\n1. Hausübungen\r\n\r\nSie dürfen nun die ersten vier Hausübungen auch in Kleingruppen (nicht mehr als 3 Personen) abgeben. Ab der fünften Hausübungsbagabe werden Sie voraussichtlich wieder einzeln abgeben. Das kündigen wir allerdings noch rechtzeitig an. Auf dem Informationsblatt sind die genauen Modalitäten noch einmal ausgeführt. Bitte lesen Sie sich dieses im Vorfeld noch einmal sorgfältig durch!\r\n\r\n2. Auffangübung\r\n\r\nDamit auch alle, die derzeit noch euf einen Übungsplatz warten zumindest in der Auffangübung einen Platz finden, haben wir Ort und Zeit der ersten beiden Übungstermine etwas geändert: Am 23.10. und 06.11. (die Übung am 30.11. fällt aufgrund des Reformationstages aus) wird die Auffangübung von 17:00 - 18:30 Uhr in S105 122 stattfinden. Bitte beachten Sie, dass es auch in der Auffangübung möglich sein wird Hausübungen abgzugeben.\r\n\r\nViele Grüße und einen guten Studienbeginn\r\n\r\nAlbrun Knof',
          date: '17.10.2017',
          time: '10:07',
          folder: 'inbox',
          unread: false,
          from: 'Albrun Knof',
          to: 'Oliver Robert Mayer',
        },
        {
          id: 366363338940412,
          subject:
            '"20-00-0004-iv": "mündliche / schriftliche Prüfung (Fachprüfung)": Prüfung angemeldet',
          body:
            'Sie wurden für die Prüfung "mündliche / schriftliche Prüfung (Fachprüfung)" im Rahmen des Angebots "Funktionale und objektorientierte Programmierkonzepte" angemeldet. Details finden Sie in Ihrem Stundenplan.\r\nDatum: Di, 3. Apr. 2018\r\nUhrzeit: 12:00-14:30',
          date: '03.11.2017',
          time: '09:16',
          folder: 'inbox',
          unread: true,
          from: 'System',
          to: 'Oliver Robert Mayer',
        },
        {
          id: 366363340898426,
          subject:
            '"20-00-0004-iv": "mündliche / schriftliche Prüfung (Studienleistung)": Prüfung angemeldet',
          body:
            'Sie wurden für die Prüfung "mündliche / schriftliche Prüfung (Studienleistung)" im Rahmen des Angebots "Funktionale und objektorientierte Programmierkonzepte" angemeldet. Details finden Sie in Ihrem Stundenplan.\r\nDatum: Offen\r\nUhrzeit: Offen',
          date: '03.11.2017',
          time: '09:16',
          folder: 'inbox',
          unread: true,
          from: 'System',
          to: 'Oliver Robert Mayer',
        },
      ],
    },
    updateCourses: {
      courses: [
        {
          code: '04-00-0118',
          name: 'Mathematik I (für Informatik und Wirtschaftsinformatik)',
          instructor:
            'Prof. Dr. rer. nat. Thomas Streicher; M.Sc. Julian Bitterlich; Albrun Knof',
          semester: 15026000,
        },
        {
          code: '20-00-0006',
          name: 'Grundlagen der Informatik III',
          instructor: 'Prof. Dr.-Ing. Michael Gösele',
          semester: 15036000,
        },
        {
          code: '01-10-5100',
          name: 'Grundlagen der Betriebswirtschaftslehre',
          instructor: 'Prof. Dr. Alexander Kock',
          semester: 15026000,
        },
        {
          code: '01-41-5100',
          name: 'Vertragsrecht',
          instructor: 'Prof. Dr. jur. Jochen Marly',
          semester: 15026000,
        },
      ],
    },
    updateCourseOffers: {
      offers: [],
    },
    updateExams: {
      exams: [
        {
          id: 372364159383991,
          code: '04-00-0119',
          courseName: 'Mathematik II für Informatik und Wirtschaftsinformatik',
          examName: 'Fachprüfung  1. Termin',
          date: 'Do, 3. Sep. 2020 16:00-17:30',
          semester: 15086000,
          status: 'register',
          regArgs: [15076000, 375771926178058],
        },
        {
          id: 373675105627843,
          code: '20-00-0015-iv',
          courseName: 'Informationsmanagement',
          examName: 'mündliche / schriftliche Prüfung (Fachprüfung)  1. Termin',
          date: 'Mo, 7. Sep. 2020 10:00-12:30',
          semester: 15086000,
          status: 'register',
          regArgs: [15076000, 375771926178176],
        },
        {
          id: 365024374120533,
          code: '04-10-0119/de',
          courseName: 'Mathematik II für Informatiker',
          examName: 'Studienleistung',
          date: 'Donnerstag, 1. Januar',
          semester: '15036000',
          grade: 'b',
        },
        {
          id: 365775488004215,
          code: '18-hi-3002',
          courseName: 'Was steckt dahinter?',
          examName: 'Kolloquium',
          date: 'Donnerstag, 1. Januar',
          semester: '15036000',
          grade: 'b',
        },
        {
          id: 364304652583216,
          code: '20-00-0000-tt',
          courseName: 'Mentorensystem',
          examName: 'mündliche / schriftliche Prüfung (Studienleistung)',
          date: 'Freitag, 9. Februar',
          semester: '15026000',
          grade: 'b',
        },
      ],
    },
  },
};

export default dummyResponse;
