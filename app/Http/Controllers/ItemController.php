<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Carbon;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = Items::orerBy('created_at', 'DESC')->get();
        foreach($items as &$item) { $item->completed = (bool) $item->completed;}
        return $items;
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
        $newItem = new Item;
        $newItem->name = $request->item["name"];
        $newItem->save();
        return $newItem;
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
        $existingItem = Item::find( $id );
        if( !$existingItem ) return "Item not found.";
        $existingItem->completed = $request->item["completed"] ? true : false;
        $existingItem->completed_at = $request->item["completed"] ? Carbon::now() : null;
        $existingItem->save();
        return $existingItem;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $existingItem = Item::finde( $id );
        if( !$existingItem ) return "Item not found.";
        $existingItem->delete();
        return "Item successfully deleted.";
    }
}
