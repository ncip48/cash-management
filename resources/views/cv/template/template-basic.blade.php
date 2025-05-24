<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>CV - John Doe</title>
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
            margin-bottom: 10px;
        }

        h2 {
            font-size: 18px;
            margin-top: 30px;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
        }

        .contact {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            font-size: 13px;
            margin-bottom: 15px;
        }

        .contact i {
            margin-right: 4px;
            color: #444;
        }

        .list {
            margin-bottom: 20px;
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
    </style>
</head>

<body>
    <div class="container">

        <!-- Biodata & Kontak -->
        <section>
            <h1 class="bold">{{ $cv->owner_name }}</h1>
            <div class="contact">
                <span><i class="fas fa-phone"></i> {{ $cv->owner_phone }}</span>
                <span><i class="fas fa-envelope"></i> {{ $cv->owner_email }}</span>
                <span><i class="fab fa-linkedin"></i> {{ $cv->owner_linkedin }}</span>
                <span><i class="fas fa-globe"></i> {{ $cv->owner_website }}</span>
                <span><i class="fas fa-map-marker-alt"></i> {{ $cv->owner_address }}</span>
            </div>
        </section>

        <!-- Ringkasan Profil -->
        <section>
            <p>
                {{ $cv->owner_summary }}
            </p>
        </section>

        <!-- Riwayat Pekerjaan -->
        @if ($cv->experience->isNotEmpty())
            <section>
                <h2>Riwayat Pekerjaan</h2>
                @foreach ($cv->experience ?? [] as $exp)
                    <div class="list">
                        <strong>{{ $exp->position }} - {{ $exp->company_name }}</strong>
                        <div class="flex">
                            <span>{{ $exp->employment_type ?? 'Full-time' }}</span>
                            <span>{{ $exp->location ?? 'Jakarta' }}, {{ $exp->start_date }} -
                                {{ $exp->end_date ?? 'Sekarang' }}</span>
                        </div>
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
        @if ($cv->education->isNotEmpty())
            <section>
                <h2>Riwayat Pendidikan</h2>
                @foreach ($cv->education ?? [] as $edu)
                    <div class="list">
                        <strong>{{ $edu->degree }} - {{ $edu->school_name }}</strong>
                        <div class="flex">
                            <span>GPA: {{ $edu->gpa ?? '3.5' }}</span>
                            <span>{{ $edu->location ?? 'Depok' }}, {{ $edu->start_date }} -
                                {{ $edu->end_date }}</span>
                        </div>
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
            <p><strong>Soft Skill:</strong> Komunikasi, Kerja Tim, Problem Solving</p>
            <p><strong>Hard Skill:</strong> REST API, Database Design, Testing</p>
            <p><strong>Software Skill:</strong> Laravel, React.js, Git, Figma, Docker</p>
        </section>

        <!-- Sertifikasi -->
        @if ($cv->certifications->isNotEmpty())
            <section>
                <h2>Sertifikasi</h2>
                @foreach ($cv->certifications ?? [] as $cert)
                    <div class="list">
                        <strong>{{ $cert->title }}</strong>
                        <div class="flex">
                            <span>{{ $cert->position ?? 'Peserta' }}</span>
                            <span>{{ $cert->location ?? 'Online' }}, {{ $cert->start_date }} -
                                {{ $cert->end_date }}</span>
                        </div>
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
