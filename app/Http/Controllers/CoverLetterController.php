<?php

namespace App\Http\Controllers;

use App\Models\CoverLetter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

class CoverLetterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('coverletters', [
            'letters' => CoverLetter::select('*')->get(),
            'laraVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
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
        /*
        resource
        url
        company
        name
        status
        info
        text
        */
        $request->validate([
            'resource' => ['required'],
            'url' => ['required'],
            'company' => ['required'],
            'name' => ['required'],
            'status' => ['required'],
            'info' => ['required'],
            'text' => ['required'],
        ], [
            'resource.required' => 'Item resource is required!',
            'url.required' => 'Item url is required!',
            'company.required' => 'Item company is required!',
            'name.required' => 'Item name is required!',
            'status.required' => 'Item status is required!',
            'info.required' => 'Item info is required!',
            'text.required' => 'Item text is required!',
        ]);
        CoverLetter::create([
            'resource' => $request->resource,
            'url' => $request->url,
            'company' => $request->company,
            'name' => $request->name,
            'status' => $request->status,
            'info' => $request->info,
            'text' => $request->text,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CoverLetter $coverLetter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CoverLetter $coverLetter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CoverLetter $coverLetter)
    {
        $request->validate([
            'resource' => ['required'],
            'url' => ['required'],
            'company' => ['required'],
            'name' => ['required'],
            'status' => ['required'],
            'info' => ['required'],
            'text' => ['required'],
        ], [
            'resource.required' => 'Item resource is required!',
            'url.required' => 'Item url is required!',
            'company.required' => 'Item company is required!',
            'name.required' => 'Item name is required!',
            'status.required' => 'Item status is required!',
            'info.required' => 'Item info is required!',
            'text.required' => 'Item text is required!',
        ]);
        $coverLetter->update([
            'resource' => $request->resource,
            'url' => $request->url,
            'company' => $request->company,
            'name' => $request->name,
            'status' => $request->status,
            'info' => $request->info,
            'text' => $request->text,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CoverLetter $coverLetter)
    {
        $coverLetter->delete();
    }
}
