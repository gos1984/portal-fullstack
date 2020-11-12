//package ru.gostinfo.portal.backend.exception;
//
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.AccessDeniedException;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
//
//@ControllerAdvice
//public class CustomAccessDeniedHandler {
//
//
//    @ExceptionHandler(BadCredentialsException.class)
//    @ResponseBody
//    public ResponseEntity<Object> handleBadCredentials(Exception ex) {
//        System.out.println("*********************");
//        System.out.println(ex.getMessage());
//        System.out.println("*********************");
//        return new ResponseEntity<Object>("Invalid basic authentication token", new HttpHeaders(), HttpStatus.FORBIDDEN);
//    }
//
//    @ExceptionHandler(AccessDeniedException.class)
//    @ResponseBody
//    public ResponseEntity<Object> handleAccessDenied(AccessDeniedException ex) {
//        System.out.println("*********************");
//        System.out.println(ex.getMessage());
//        System.out.println("*********************");
//        return new ResponseEntity<Object>("Access denied", new HttpHeaders(), HttpStatus.FORBIDDEN);
//    }
//
////    @Override
////    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AccessDeniedException e) throws IOException, ServletException {
////        httpServletResponse.sendRedirect("/error");
////    }
//}
