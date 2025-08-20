<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cover_letters', function (Blueprint $table) {
            $table->after('updated_at', function (Blueprint $table) {
                $table->boolean('hide')->default(0);
            });
            $table->after('contact_name', function (Blueprint $table) {
                $table->string('stage');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cover_letters', function (Blueprint $table) {
            $table->dropColumn(['hide', 'stage']);
        });
    }
};
