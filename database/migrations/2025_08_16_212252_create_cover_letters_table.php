<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     */
    public function up(): void
    {
        Schema::create('cover_letters', function (Blueprint $table) {
            /*
            resource
            url
            company
            name
            status
            info
            text
            */
            $table->id();
            $table->timestamps();
            $table->string('url');
            $table->string('chat');
            $table->string('company');
            $table->string('contact_name');
            $table->string('status');
            $table->string('title');
            $table->text('info');
            $table->text('content');
        });
    }
    public function __up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->boolean('completed')->default(false);
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cover_letters');
    }
};
