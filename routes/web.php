<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\CoverLetterController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Route::get('todo', function () {
//     return Inertia::render('todo');
// })->name('todo');

Route::get('todos', [TodoController::class, 'index'])->name('todos.index');
Route::post('todos', [TodoController::class, 'store'])->name('todos.store');
Route::patch('todos/{todo}', [TodoController::class, 'update'])->name('todos.update');
Route::put('todos/{todo}', [TodoController::class, 'updateCompletion'])->name('todos.updateCompletion');
Route::delete('todos/{todo}', [TodoController::class, 'destroy'])->name('todos.destroy');

Route::get('coverletters', [CoverLetterController::class, 'index'])->name('coverletters.index');
Route::get('cl-hidden', [CoverLetterController::class, 'clHidden'])->name('coverletters.hidden');
Route::post('coverletters', [CoverLetterController::class, 'store'])->name('coverletters.store');
Route::patch('coverletters/{coverLetter}', [CoverLetterController::class, 'update'])->name('coverletters.update');
Route::patch('coverletters/complete/{coverLetter}', [CoverLetterController::class, 'complete'])->name('letters.complete');
Route::patch('coverletters/hide/{coverLetter}', [CoverLetterController::class, 'hide'])->name('letters.hide');
Route::delete('coverletters/{coverLetter}', [CoverLetterController::class, 'destroy'])->name('coverletters.destroy');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
