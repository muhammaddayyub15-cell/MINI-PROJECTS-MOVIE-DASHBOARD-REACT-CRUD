<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    /**
     * Handle request untuk memastikan hanya admin
     */
    public function handle(Request $request, Closure $next)
    {
        // 🔐 pastikan user login (dari Sanctum)
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // 👑 cek role admin
        if ($user->role !== 'admin') {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden: Admin only access'
            ], 403);
        }

        return $next($request);
    }
}