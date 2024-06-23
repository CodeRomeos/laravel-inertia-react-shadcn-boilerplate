@extends('errors::minimal')

@section('title', __('Forbidden'))
@section('code', '403')
@section('image')
    <img src="/images/errors/undraw_cancel_re_pkdm.svg" alt="Error 403">
@endsection
@section('message')
    <div>{{ __($exception->getMessage() ?: 'Forbidden') }}</div>
@endsection
