<!DOCTYPE
    html>
<html>
<head>
    <title></title>
</head>
<body>
<h1>Inquiries</h1>
<ul>
    @foreach($inquiries as $inquiry)
        <li>
            <p>{{$inquiry->text}}</p>
        </li>
    @endforeach
</ul>
</body>
</html>
