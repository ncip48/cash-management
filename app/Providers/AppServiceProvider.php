<?php

namespace App\Providers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        if (!app()->environment('local')) {
            URL::forceScheme(scheme: 'https');
        }

        /**
         * Adds created_by and updated_by columns to track record creation and updates
         * 
         * @method creatorAndUpdater
         * @return void
         * 
         * @example
         * Schema::create('table_name', function (Blueprint $table) {
         *     $table->id();
         *     $table->creatorAndUpdater();
         * });
         */
        Blueprint::macro('creatorAndUpdater', function () {
            $this->uuid('created_by');
            $this->foreign('created_by')->references('id')->on('users')->onDelete('cascade');

            $this->uuid('updated_by')->nullable();
            $this->foreign('updated_by')->references('id')->on('users')->onDelete('cascade');
        });

        Inertia::share([
            "googleApiKey" => env('GOOGLE_API_KEY'),
            'apiUrl' => env('API_URL', 'http://localhost:8000'),
            'wsUrl' => env('WS_URL', 'ws://localhost:8000'),
            'flash' => function () {
                return [
                    'success' => session('success'),
                    'error' => session('error'),
                ];
            },
        ]);
    }
}
