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
            'letters' => CoverLetter::select('*')->where('hide', 0)->latest()->get(),
            // 'lettersHidden' => CoverLetter::select('*')->where('hide', 1)->latest()->get(),
            'title' => "Cover Letters",
            'laraVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function clHidden()
    {
        return Inertia::render('coverletters', [ // clhidden
            // 'letters' => CoverLetter::select('*')->where('hide', 0)->latest()->get(),
            'letters' => CoverLetter::select('*')->where('hide', 1)->latest()->get(),
            'title' => "Hidden Cover Letters",
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
        // echo 'CoverLetterController->store: ';
        $data = $this->prepare_data($request);
        $coverLetter = CoverLetter::create($data);
        // return response()->json([
        //     'message' => 'Cover letter created successfully',
        //     'data' => $coverLetter,
        // ], 201);
    }

    private function prepare_data($request){
        /*
        url
        chat
        company
        contact_name
        status
        title
        info
        text
        */
        $request->validate([
            'url' => ['required'],
            'chat' => ['required'],
            // 'hide' => ['required'],
            'company' => ['required'],
            'contact_name' => ['required'],
            // 'stage' => ['required'],
            'status' => ['required'],
            'title' => ['required'],
            'info' => ['required'],
            'content' => ['required'],
        ], [
            'url.required' => 'url is required!',
            'chat.required' => 'chat is required!',
            'company.required' => 'company is required!',
            'contact_name.required' => 'contact name is required!',
            'stage.required' => 'stage is required!',
            'status.required' => 'status is required!',
            'title.required' => 'title is required!',
            'info.required' => 'info is required!',
            'content.required' => 'content is required!',
        ]);
        $data = [
            'hide' => $request->hide,
            'url' => $request->url,
            'chat' => $request->chat,
            'company' => $request->company,
            'contact_name' => $request->contact_name,
            'stage' => $request->stage,
            'status' => $request->status,
            'title' => $request->title,
            'info' => $request->info,
            'content' => $request->content,
        ];
        return $data;
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
        $data = $this->prepare_data($request);
        // print_r($data);
        $coverLetter->update($data);
        // return $data;
    }

    /**
     * Update the specified resource in storage.
     */
    public function complete(Request $request, CoverLetter $coverLetter)
    {
        $data = $this->prepare_data($request);
        $data = array_filter($data, function ($k) { return $k == 'status' || $k == 'stage'; }, ARRAY_FILTER_USE_KEY );
        $coverLetter->update($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function hide(Request $request, CoverLetter $coverLetter)
    {
        // $request->validate(
        //     [ 'hide' => ['required'], ],
        //     [ 'hide.required' => 'hide is required!', ]
        // );
        $data = [ 'hide' => !$request->hide, ];
        $coverLetter->update($data);
        // return $data
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CoverLetter $coverLetter)
    {
        $coverLetter->delete();
    }
}
