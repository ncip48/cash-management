<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>CV - {{ $cv->owner_name }}</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            margin: 0;
            padding: 40px;
            background: #fff;
            color: #333;
        }

        .container {
            max-width: 800px;
            margin: auto;
        }

        h1 {
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 0px;
        }

        h2 {
            font-size: 18px;
            margin-top: 30px;
            border-bottom: 2px solid #000;
            padding-bottom: 5px;
        }

        .contact {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            font-size: 13px;
            margin-bottom: 0px;
        }

        .contact i {
            margin-right: 4px;
            color: #444;
        }

        .list {
            margin-bottom: 11px;
        }

        .flex {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: #555;
            margin: 3px 0 8px;
        }

        ul {
            padding-left: 18px;
            margin: 0;
        }

        ul li {
            list-style-type: disc;
            margin-bottom: 4px;
        }

        .section p {
            margin-bottom: 10px;
        }

        h2 {
            margin-top: 5px;
        }

        section {
            margin: 0;
            padding: 0;
        }

        .contact span {
            color: gray
        }
    </style>
</head>

<body>
    <div class="container">

        <!-- Biodata & Kontak -->
        <section>
            <h1 class="bold" style="margin-top: 0px;padding-top: 0px;">{{ $cv->owner_name }}</h1>
            <div class="contact">
                <span><i class="fas fa-phone"></i> {{ $cv->owner_phone }} |</span>
                <span><i class="fas fa-envelope"></i> {{ $cv->owner_email }} |</span>
                @if ($cv->owner_linkedin)
                    <span><i class="fab fa-linkedin"></i> {{ $cv->owner_linkedin }} |</span>
                @endif
                @if ($cv->owner_website)
                    <span><i class="fas fa-globe"></i> {{ $cv->owner_website }} |</span>
                @endif
                <span><i class="fas fa-map-marker-alt"></i> {{ $cv->owner_address }}</span>
            </div>
        </section>

        <!-- Ringkasan Profil -->
        <section>
            <p style="text-align: justify;margin-top: 0px;">
                {{ $cv->owner_summary }}
            </p>
        </section>

        <!-- Riwayat Pekerjaan -->
        @if ($cv->experiences->isNotEmpty())
            <section>
                @if ($cv->language == 'id')
                    <h2>Riwayat Pekerjaan</h2>
                @else
                    <h2>Work Experience</h2>
                @endif
                @foreach ($cv->experiences ?? [] as $exp)
                    <div class="list">
                        <strong>{{ $exp->position }} - {{ $exp->company_name }}</strong>
                        <table
                            style="width: 100%; font-size: 13px; color: #555; margin: 0px 0 0px;margin-left:-2px;margin-right:-2px;margin-bottom:-2px;margin-top:-2px">
                            <tr>
                                <td style="text-align: left;">{{ $exp->employment_type ?? 'Full-time' }}</td>
                                <td style="text-align: right;">{{ $exp->location ?? 'Online' }},
                                    {{ $exp->start_date }} - {{ $exp->end_date }}</td>
                            </tr>
                        </table>

                        <ul>
                            @foreach (explode("\n", $exp->description) as $desc)
                                <li>{{ $desc }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endforeach
            </section>
        @endif

        <!-- Riwayat Pendidikan -->
        @if ($cv->educations->isNotEmpty())
            <section>
                @if ($cv->language == 'id')
                    <h2>Riwayat Pendidikan</h2>
                @else
                    <h2>Education</h2>
                @endif
                @foreach ($cv->educations ?? [] as $edu)
                    <div class="list">
                        <strong>{{ $edu->degree }} - {{ $edu->school_name }}</strong>
                        <table
                            style="width: 100%; font-size: 13px; color: #555; margin: 0px 0 0px;margin-left:-2px;margin-right:-2px;margin-bottom:-2px;margin-top:-2px">
                            <tr>
                                <td style="text-align: left;">GPA: {{ $edu->gpa ?? '3.5' }}</td>
                                <td style="text-align: right;">{{ $edu->location ?? 'Online' }},
                                    {{ $edu->start_date }}
                                    - {{ $edu->end_date }}</td>
                            </tr>
                        </table>

                        @if ($edu->description)
                            <ul>
                                @foreach (explode("\n", $edu->description) as $desc)
                                    <li>{{ $desc }}</li>
                                @endforeach
                            </ul>
                        @endif
                    </div>
                @endforeach
            </section>
        @endif

        <!-- Skill -->
        <section>
            <h2>Skill</h2>
            <p style="padding:0;margin-bottom:5px;margin-top:0px"><strong>Soft Skill:</strong> Komunikasi, Kerja Tim,
                Problem Solving
            </p>
            <p style="padding:0;margin-bottom:5px;margin-top:0px"><strong>Hard Skill:</strong> REST API, Database
                Design, Testing</p>
            <p style="padding:0;margin-bottom:5px;margin-top:0px"><strong>Software Skill:</strong> Laravel, React.js,
                Git, Figma,
                Docker</p>
        </section>

        <!-- Sertifikasi -->
        @if ($cv->certifications->isNotEmpty())
            <section>
                @if ($cv->language == 'id')
                    <h2>Sertifikasi</h2>
                @else
                    <h2>Certification</h2>
                @endif
                @foreach ($cv->certifications ?? [] as $cert)
                    <div class="list">
                        <strong>{{ $cert->title }}</strong>
                        <table
                            style="width: 100%; font-size: 13px; color: #555; margin: 0px 0 0px;margin-left:-2px;margin-right:-2px;margin-bottom:-2px;margin-top:-2px">
                            <tr>
                                <td style="text-align: left;">{{ $cert->position ?? 'Peserta' }}</td>
                                <td style="text-align: right;">{{ $cert->location ?? 'Online' }},
                                    {{ $cert->start_date }} - {{ $cert->end_date }}</td>
                            </tr>
                        </table>

                        <ul>
                            @foreach (explode("\n", $cert->description) as $desc)
                                <li>{{ $desc }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endforeach
            </section>
        @endif
    </div>
</body>

</html>
