<?php

namespace App\Http\Controllers;

use App\Models\CV;
use App\Models\CVTemplate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class CVController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cvs = CV::with('template')->owned()->get();
        $templates = CVTemplate::all();

        return Inertia::render('cv/index', [
            'items' => $cvs,
            'templates' => $templates,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Print the specified resource.
     */
    public function print(string $id)
    {
        $cv = CV::with('template')->owned()->find($id);

        $pdf = PDF::loadView($cv->template->path, compact('cv'));
        return $pdf->stream();
    }

    //make copy feature
    public function copy($id)
    {
        DB::beginTransaction();

        try {
            $original = Cv::with(['experiences', 'educations', 'certifications'])->findOrFail($id);

            // Duplicate the CV
            $copy = $original->replicate();
            $copy->name = $original->name . ' (Copy)';
            $copy->save();

            // Duplicate work experiences
            foreach ($original->experiences as $exp) {
                $expCopy = $exp->replicate();
                $expCopy->cv_id = $copy->id;
                $expCopy->save();
            }

            // Duplicate educations
            foreach ($original->educations as $edu) {
                $eduCopy = $edu->replicate();
                $eduCopy->cv_id = $copy->id;
                $eduCopy->save();
            }

            // Duplicate certifications
            foreach ($original->certifications() as $cert) {
                $certCopy = $cert->replicate();
                $certCopy->cv_id = $copy->id;
                $certCopy->save();
            }

            DB::commit();
            return redirect()->back()->with('success', 'CV copied successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to copy CV: ' . $e->getMessage());
        }
    }
}
